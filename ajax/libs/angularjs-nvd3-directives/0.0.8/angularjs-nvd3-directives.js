/*! angularjs-nvd3-directives - v0.0.8 - 2015-02-04
 * http://angularjs-nvd3-directives.github.io/angularjs-nvd3-directives
 * Copyright (c) 2015 Christian Maurer; Licensed Apache License, v2.0 */
( function () {
  'use strict';


  angular.module( 'legendDirectives', [] ).directive( 'simpleSvgLegend', function () {
    return {
      restrict: 'EA',
      scope: {
        id: '@',
        width: '@',
        height: '@',
        margin: '@',
        x: '@',
        y: '@',
        labels: '@',
        styles: '@',
        classes: '@',
        shapes: '@',
        padding: '@',
        columns: '@'
      },
      compile: function () {
        return function link( scope, element, attrs ) {
          var id, width, height, margin, widthTracker = 0,
            heightTracker = 0,
            columns = 1,
            columnTracker = 0,
            padding = 10,
            paddingStr, svgNamespace = 'http://www.w3.org/2000/svg',
            svg, g, labels, styles, classes, shapes, x = 0,
            y = 0;
          margin = scope.$eval( attrs.margin ) || {
            left: 5,
            top: 5,
            bottom: 5,
            right: 5
          };
          width = attrs.width === 'undefined' ? element[ 0 ].parentElement.offsetWidth - ( margin.left + margin.right ) : +attrs.width - ( margin.left + margin.right );
          height = attrs.height === 'undefined' ? element[ 0 ].parentElement.offsetHeight - ( margin.top + margin.bottom ) : +attrs.height - ( margin.top + margin.bottom );
          if ( !attrs.id ) {
            //if an id is not supplied, create a random id.
            id = 'legend-' + Math.random();
          } else {
            id = attrs.id;
          }
          if ( attrs.columns ) {
            columns = +attrs.columns;
          }
          if ( attrs.padding ) {
            padding = +attrs.padding;
          }
          paddingStr = padding + '';
          svg = document.createElementNS( svgNamespace, 'svg' );
          if ( attrs.width ) {
            svg.setAttribute( 'width', width + '' );
          }
          if ( attrs.height ) {
            svg.setAttribute( 'height', height + '' );
          }
          svg.setAttribute( 'id', id );
          if ( attrs.x ) {
            x = +attrs.x;
          }
          if ( attrs.y ) {
            y = +attrs.y;
          }
          element.append( svg );
          g = document.createElementNS( svgNamespace, 'g' );
          g.setAttribute( 'transform', 'translate(' + x + ',' + y + ')' );
          svg.appendChild( g );
          if ( attrs.labels ) {
            labels = scope.$eval( attrs.labels );
          }
          if ( attrs.styles ) {
            styles = scope.$eval( attrs.styles );
          }
          if ( attrs.classes ) {
            classes = scope.$eval( attrs.classes );
          }
          if ( attrs.shapes ) {
            shapes = scope.$eval( attrs.shapes );
          }
          for ( var i in labels ) {
            if ( labels.hasOwnProperty( i ) ) {
              var shpe = shapes[ i ],
                shape, text, textSize, g1;
              if ( columnTracker % columns === 0 ) {
                widthTracker = 0;
                heightTracker = heightTracker + ( padding + padding * 1.5 );
              }
              g1 = document.createElementNS( svgNamespace, 'g' );
              g1.setAttribute( 'transform', 'translate(' + widthTracker + ', ' + heightTracker + ')' );
              if ( shpe === 'rect' ) {
                shape = document.createElementNS( svgNamespace, 'rect' );
                //x, y, rx, ry
                shape.setAttribute( 'y', 0 - padding / 2 + '' );
                shape.setAttribute( 'width', paddingStr );
                shape.setAttribute( 'height', paddingStr );
              } else if ( shpe === 'ellipse' ) {
                shape = document.createElementNS( svgNamespace, 'ellipse' );
                shape.setAttribute( 'rx', paddingStr );
                shape.setAttribute( 'ry', padding + padding / 2 + '' );
              } else {
                shape = document.createElementNS( svgNamespace, 'circle' );
                shape.setAttribute( 'r', padding / 2 + '' );
              }
              if ( styles && styles[ i ] ) {
                shape.setAttribute( 'style', styles[ i ] );
              }
              if ( classes && classes[ i ] ) {
                shape.setAttribute( 'class', classes[ i ] );
              }
              g1.appendChild( shape );
              widthTracker = widthTracker + shape.clientWidth + ( padding + padding / 2 );
              text = document.createElementNS( svgNamespace, 'text' );
              text.setAttribute( 'transform', 'translate(10, 5)' );
              text.appendChild( document.createTextNode( labels[ i ] ) );
              g1.appendChild( text );
              g.appendChild( g1 );
              textSize = text.clientWidth;
              widthTracker = widthTracker + textSize + ( padding + padding * 0.75 );
              columnTracker++;
            }
          }
        };
      }
    };
  } ).directive( 'nvd3Legend', [ function () {
    var margin, width, height, id;
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        id: '@',
        margin: '&',
        width: '@',
        height: '@',
        key: '&',
        color: '&',
        align: '@',
        rightalign: '@',
        updatestate: '@',
        radiobuttonmode: '@',
        x: '&',
        y: '&'
      },
      link: function ( scope, element, attrs ) {
        scope.$watch( 'data', function ( data ) {
          if ( data ) {
            if ( scope.chart ) {
              return d3.select( '#' + attrs.id + ' svg' ).attr( 'height', height ).attr( 'width', width ).datum( data ).transition().duration( 250 ).call( scope.chart );
            }
            margin = scope.$eval( attrs.margin ) || {
              top: 5,
              right: 0,
              bottom: 5,
              left: 0
            };
            width = attrs.width === undefined ? element[ 0 ].parentElement.offsetWidth - ( margin.left + margin.right ) : +attrs.width - ( margin.left + margin.right );
            height = attrs.height === undefined ? element[ 0 ].parentElement.offsetHeight - ( margin.top + margin.bottom ) : +attrs.height - ( margin.top + margin.bottom );
            if ( width === undefined || width < 0 ) {
              width = 400;
            }
            if ( height === undefined || height < 0 ) {
              height = 20;
            }
            if ( !attrs.id ) {
              //if an id is not supplied, create a random id.
              id = 'legend-' + Math.random();
            } else {
              id = attrs.id;
            }
            nv.addGraph( {
              generate: function () {
                var chart = nv.models.legend().width( width ).height( height ).margin( margin ).align( attrs.align === undefined ? true : attrs.align === 'true' ).rightAlign( attrs.rightalign === undefined ? true : attrs.rightalign === 'true' ).updateState( attrs.updatestate === undefined ? true : attrs.updatestate === 'true' ).radioButtonMode( attrs.radiobuttonmode === undefined ? false : attrs.radiobuttonmode === 'true' ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).key( attrs.key === undefined ? function ( d ) {
                  return d.key;
                } : scope.key() );
                if ( !d3.select( '#' + attrs.id + ' svg' )[ 0 ][ 0 ] ) {
                  d3.select( '#' + attrs.id ).append( 'svg' );
                }
                d3.select( '#' + attrs.id + ' svg' ).attr( 'height', height ).attr( 'width', width ).datum( data ).transition().duration( 250 ).call( chart );
                nv.utils.windowResize( chart.update );
                scope.chart = chart;
                return chart;
              }
            } );
          }
        } );
      }
    };
  } ] );

  function initializeLegendMargin( scope, attrs ) {
    var margin = ( scope.$eval( attrs.legendmargin ) || {
      left: 0,
      top: 5,
      bottom: 5,
      right: 0
    } );
    if ( typeof ( margin ) !== 'object' ) {
      // we were passed a vanilla int, convert to full margin object
      margin = {
        left: margin,
        top: margin,
        bottom: margin,
        right: margin
      };
    }
    scope.legendmargin = margin;
  }

  function configureLegend( chart, scope, attrs ) {
    if ( chart.legend && attrs.showlegend && ( attrs.showlegend === 'true' ) ) {
      initializeLegendMargin( scope, attrs );
      chart.legend.margin( scope.legendmargin );
      chart.legend.width( attrs.legendwidth === undefined ? 400 : ( +attrs.legendwidth ) );
      chart.legend.height( attrs.legendheight === undefined ? 20 : ( +attrs.legendheight ) );
      chart.legend.key( attrs.legendkey === undefined ? function ( d ) {
        return d.key;
      } : scope.legendkey() );
      chart.legend.color( attrs.legendcolor === undefined ? nv.utils.defaultColor() : scope.legendcolor() );
      chart.legend.align( attrs.legendalign === undefined ? true : ( attrs.legendalign === 'true' ) );
      chart.legend.rightAlign( attrs.legendrightalign === undefined ? true : ( attrs.legendrightalign === 'true' ) );
      chart.legend.updateState( attrs.legendupdatestate === undefined ? true : ( attrs.legendupdatestate === 'true' ) );
      chart.legend.radioButtonMode( attrs.legendradiobuttonmode === undefined ? false : ( attrs.legendradiobuttonmode === 'true' ) );
    }
  }

  function processEvents( chart, scope ) {
    if ( chart.dispatch ) {
      if ( chart.dispatch.tooltipShow ) {
        chart.dispatch.on( 'tooltipShow.directive', function ( event ) {
          scope.$emit( 'tooltipShow.directive', event );
        } );
      }

      if ( chart.dispatch.tooltipHide ) {
        chart.dispatch.on( 'tooltipHide.directive', function ( event ) {
          scope.$emit( 'tooltipHide.directive', event );
        } );
      }

      if ( chart.dispatch.beforeUpdate ) {
        chart.dispatch.on( 'beforeUpdate.directive', function ( event ) {
          scope.$emit( 'beforeUpdate.directive', event );
        } );
      }

      if ( chart.dispatch.stateChange ) {
        chart.dispatch.on( 'stateChange.directive', function ( event ) {
          scope.$emit( 'stateChange.directive', event );
        } );
      }

      if ( chart.dispatch.changeState ) {
        chart.dispatch.on( 'changeState.directive', function ( event ) {
          scope.$emit( 'changeState.directive', event );
        } );
      }
    }

    if ( chart.lines ) {
      chart.lines.dispatch.on( 'elementMouseover.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseover.tooltip.directive', event );
      } );

      chart.lines.dispatch.on( 'elementMouseout.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseout.tooltip.directive', event );
      } );

      chart.lines.dispatch.on( 'elementClick.directive', function ( event ) {
        scope.$emit( 'elementClick.directive', event );
      } );
    }

    if ( chart.stacked && chart.stacked.dispatch ) {
      chart.stacked.dispatch.on( 'areaClick.toggle.directive', function ( event ) {
        scope.$emit( 'areaClick.toggle.directive', event );
      } );

      chart.stacked.dispatch.on( 'tooltipShow.directive', function ( event ) {
        scope.$emit( 'tooltipShow.directive', event );
      } );

      chart.stacked.dispatch.on( 'tooltipHide.directive', function ( event ) {
        scope.$emit( 'tooltipHide.directive', event );
      } );

    }

    if ( chart.interactiveLayer ) {
      if ( chart.interactiveLayer.elementMouseout ) {
        chart.interactiveLayer.dispatch.on( 'elementMouseout.directive', function ( event ) {
          scope.$emit( 'elementMouseout.directive', event );
        } );
      }

      if ( chart.interactiveLayer.elementMousemove ) {
        chart.interactiveLayer.dispatch.on( 'elementMousemove.directive', function ( event ) {
          scope.$emit( 'elementMousemove.directive', event );
        } );
      }
    }

    if ( chart.discretebar ) {
      chart.discretebar.dispatch.on( 'elementMouseover.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseover.tooltip.directive', event );
      } );

      chart.discretebar.dispatch.on( 'elementMouseout.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseout.tooltip.directive', event );
      } );

      chart.discretebar.dispatch.on( 'elementClick.directive', function ( event ) {
        scope.$emit( 'elementClick.directive', event );
      } );
    }

    if ( chart.multibar ) {
      chart.multibar.dispatch.on( 'elementMouseover.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseover.tooltip.directive', event );
      } );

      chart.multibar.dispatch.on( 'elementMouseout.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseout.tooltip.directive', event );
      } );

      chart.multibar.dispatch.on( 'elementClick.directive', function ( event ) {
        scope.$emit( 'elementClick.directive', event );
      } );

    }

    if ( chart.pie ) {
      chart.pie.dispatch.on( 'elementMouseover.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseover.tooltip.directive', event );
      } );

      chart.pie.dispatch.on( 'elementMouseout.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseout.tooltip.directive', event );
      } );

      chart.pie.dispatch.on( 'elementClick.directive', function ( event ) {
        scope.$emit( 'elementClick.directive', event );
      } );
    }

    if ( chart.scatter ) {
      chart.scatter.dispatch.on( 'elementMouseover.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseover.tooltip.directive', event );
      } );

      chart.scatter.dispatch.on( 'elementMouseout.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseout.tooltip.directive', event );
      } );
    }

    if ( chart.bullet ) {
      chart.bullet.dispatch.on( 'elementMouseover.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseover.tooltip.directive', event );
      } );

      chart.bullet.dispatch.on( 'elementMouseout.tooltip.directive', function ( event ) {
        scope.$emit( 'elementMouseout.tooltip.directive', event );
      } );
    }

    if ( chart.legend ) {
      //'legendClick', 'legendDblclick', 'legendMouseover'
      //stateChange
      chart.legend.dispatch.on( 'stateChange.legend.directive', function ( event ) {
        scope.$emit( 'stateChange.legend.directive', event );
      } );
      chart.legend.dispatch.on( 'legendClick.directive', function ( d, i ) {
        scope.$emit( 'legendClick.directive', d, i );
      } );
      chart.legend.dispatch.on( 'legendDblclick.directive', function ( d, i ) {
        scope.$emit( 'legendDblclick.directive', d, i );
      } );
      chart.legend.dispatch.on( 'legendMouseover.directive', function ( d, i ) {
        scope.$emit( 'legendMouseover.directive', d, i );
      } );
    }

    if ( chart.controls ) {
      if ( chart.controls.legendClick ) {
        chart.controls.dispatch.on( 'legendClick.directive', function ( d, i ) {
          scope.$emit( 'legendClick.directive', d, i );
        } );
      }
    }

  }

  function configureXaxis( chart, scope, attrs ) {
    if ( attrs.xaxisorient ) {
      chart.xAxis.orient( attrs.xaxisorient );
    }
    if ( attrs.xaxisticks ) {
      chart.xAxis.scale().ticks( attrs.xaxisticks );
    }
    if ( attrs.xaxistickvalues ) {
      if ( Array.isArray( scope.$eval( attrs.xaxistickvalues ) ) ) {
        chart.xAxis.tickValues( scope.$eval( attrs.xaxistickvalues ) );
      } else if ( typeof scope.xaxistickvalues() === 'function' ) {
        chart.xAxis.tickValues( scope.xaxistickvalues() );
      }
    }
    if ( attrs.xaxisticksubdivide ) {
      chart.xAxis.tickSubdivide( scope.xaxisticksubdivide() );
    }
    if ( attrs.xaxisticksize ) {
      chart.xAxis.tickSize( scope.xaxisticksize() );
    }
    if ( attrs.xaxistickpadding ) {
      chart.xAxis.tickPadding( scope.xaxistickpadding() );
    }
    if ( attrs.xaxistickformat ) {
      chart.xAxis.tickFormat( scope.xaxistickformat() );
    }
    if ( attrs.xaxislabel ) {
      chart.xAxis.axisLabel( attrs.xaxislabel );
    }
    if ( attrs.xaxisscale ) {
      chart.xAxis.scale( scope.xaxisscale() );
    }
    if ( attrs.xaxisdomain ) {
      if ( Array.isArray( scope.$eval( attrs.xaxisdomain ) ) ) {
        chart.xDomain( scope.$eval( attrs.xaxisdomain ) );
      } else if ( typeof scope.xaxisdomain() === 'function' ) {
        chart.xDomain( scope.xaxisdomain() );
      }
    }
    if ( attrs.xaxisrange ) {
      if ( Array.isArray( scope.$eval( attrs.xaxisrange ) ) ) {
        chart.xRange( scope.$eval( attrs.xaxisrange ) );
      } else if ( typeof scope.xaxisrange() === 'function' ) {
        chart.xRange( scope.xaxisrange() );
      }
    }
    if ( attrs.xaxisrangeband ) {
      chart.xAxis.rangeBand( scope.xaxisrangeband() );
    }
    if ( attrs.xaxisrangebands ) {
      chart.xAxis.rangeBands( scope.xaxisrangebands() );
    }
    if ( attrs.xaxisshowmaxmin ) {
      chart.xAxis.showMaxMin( ( attrs.xaxisshowmaxmin === 'true' ) );
    }
    if ( attrs.xaxishighlightzero ) {
      chart.xAxis.highlightZero( ( attrs.xaxishighlightzero === 'true' ) );
    }
    if ( attrs.xaxisrotatelabels ) {
      chart.xAxis.rotateLabels( ( +attrs.xaxisrotatelabels ) );
    }
    //    if(attrs.xaxisrotateylabel){
    //        chart.xAxis.rotateYLabel((attrs.xaxisrotateylabel === "true"));
    //    }
    if ( attrs.xaxisstaggerlabels ) {
      chart.xAxis.staggerLabels( ( attrs.xaxisstaggerlabels === 'true' ) );
    }
    if ( attrs.xaxislabeldistance ) {
      chart.xAxis.axisLabelDistance( ( +attrs.xaxislabeldistance ) );
    }
  }

  function configureX2axis( chart, scope, attrs ) {
    if ( attrs.x2axisorient ) {
      chart.x2Axis.orient( attrs.x2axisorient );
    }
    if ( attrs.x2axisticks ) {
      chart.x2Axis.scale().ticks( attrs.x2axisticks );
    }
    if ( attrs.x2axistickvalues ) {
      if ( Array.isArray( scope.$eval( attrs.x2axistickvalues ) ) ) {
        chart.x2Axis.tickValues( scope.$eval( attrs.x2axistickvalues ) );
      } else if ( typeof scope.xaxistickvalues() === 'function' ) {
        chart.x2Axis.tickValues( scope.x2axistickvalues() );
      }
    }
    if ( attrs.x2axisticksubdivide ) {
      chart.x2Axis.tickSubdivide( scope.x2axisticksubdivide() );
    }
    if ( attrs.x2axisticksize ) {
      chart.x2Axis.tickSize( scope.x2axisticksize() );
    }
    if ( attrs.x2axistickpadding ) {
      chart.x2Axis.tickPadding( scope.x2axistickpadding() );
    }
    if ( attrs.x2axistickformat ) {
      chart.x2Axis.tickFormat( scope.x2axistickformat() );
    }
    if ( attrs.x2axislabel ) {
      chart.x2Axis.axisLabel( attrs.x2axislabel );
    }
    if ( attrs.x2axisscale ) {
      chart.x2Axis.scale( scope.x2axisscale() );
    }
    if ( attrs.x2axisdomain ) {
      if ( Array.isArray( scope.$eval( attrs.x2axisdomain ) ) ) {
        chart.x2Axis.domain( scope.$eval( attrs.x2axisdomain ) );
      } else if ( typeof scope.x2axisdomain() === 'function' ) {
        chart.x2Axis.domain( scope.x2axisdomain() );
      }
    }
    if ( attrs.x2axisrange ) {
      if ( Array.isArray( scope.$eval( attrs.x2axisrange ) ) ) {
        chart.x2Axis.range( scope.$eval( attrs.x2axisrange ) );
      } else if ( typeof scope.x2axisrange() === 'function' ) {
        chart.x2Axis.range( scope.x2axisrange() );
      }
    }
    if ( attrs.x2axisrangeband ) {
      chart.x2Axis.rangeBand( scope.x2axisrangeband() );
    }
    if ( attrs.x2axisrangebands ) {
      chart.x2Axis.rangeBands( scope.x2axisrangebands() );
    }
    if ( attrs.x2axisshowmaxmin ) {
      chart.x2Axis.showMaxMin( ( attrs.x2axisshowmaxmin === 'true' ) );
    }
    if ( attrs.x2axishighlightzero ) {
      chart.x2Axis.highlightZero( ( attrs.x2axishighlightzero === 'true' ) );
    }
    if ( attrs.x2axisrotatelables ) {
      chart.x2Axis.rotateLabels( ( +attrs.x2axisrotatelables ) );
    }
    //    if(attrs.xaxisrotateylabel){
    //        chart.xAxis.rotateYLabel((attrs.xaxisrotateylabel === "true"));
    //    }
    if ( attrs.x2axisstaggerlabels ) {
      chart.x2Axis.staggerLabels( ( attrs.x2axisstaggerlabels === 'true' ) );
    }
    if ( attrs.x2axislabeldistance ) {
      chart.x2Axis.axisLabelDistance( ( +attrs.x2axislabeldistance ) );
    }
  }

  function configureYaxis( chart, scope, attrs ) {
    if ( attrs.yaxisorient ) {
      chart.yAxis.orient( attrs.yaxisorient );
    }
    if ( attrs.yaxisticks ) {
      chart.yAxis.scale().ticks( attrs.yaxisticks );
    }
    if ( attrs.yaxistickvalues ) {
      if ( Array.isArray( scope.$eval( attrs.yaxistickvalues ) ) ) {
        chart.yAxis.tickValues( scope.$eval( attrs.yaxistickvalues ) );
      } else if ( typeof scope.yaxistickvalues() === 'function' ) {
        chart.yAxis.tickValues( scope.yaxistickvalues() );
      }
    }
    if ( attrs.yaxisticksubdivide ) {
      chart.yAxis.tickSubdivide( scope.yaxisticksubdivide() );
    }
    if ( attrs.yaxisticksize ) {
      chart.yAxis.tickSize( scope.yaxisticksize() );
    }
    if ( attrs.yaxistickpadding ) {
      chart.yAxis.tickPadding( scope.yaxistickpadding() );
    }
    if ( attrs.yaxistickformat ) {
      chart.yAxis.tickFormat( scope.yaxistickformat() );
    }
    if ( attrs.yaxislabel ) {
      chart.yAxis.axisLabel( attrs.yaxislabel );
    }
    if ( attrs.yaxisscale ) {
      chart.yAxis.scale( scope.yaxisscale() );
    }
    if ( attrs.yaxisdomain ) {
      if ( Array.isArray( scope.$eval( attrs.yaxisdomain ) ) ) {
        chart.yDomain( scope.$eval( attrs.yaxisdomain ) );
      } else if ( typeof scope.yaxisdomain() === 'function' ) {
        chart.yDomain( scope.yaxisdomain() );
      }
    }
    if ( attrs.yaxisrange ) {
      if ( Array.isArray( scope.$eval( attrs.yaxisrange ) ) ) {
        chart.yRange( scope.$eval( attrs.yaxisrange ) );
      } else if ( typeof scope.yaxisrange() === 'function' ) {
        chart.yRange( scope.yaxisrange() );
      }
    }
    if ( attrs.yaxisrangeband ) {
      chart.yAxis.rangeBand( scope.yaxisrangeband() );
    }
    if ( attrs.yaxisrangebands ) {
      chart.yAxis.rangeBands( scope.yaxisrangebands() );
    }
    if ( attrs.yaxisshowmaxmin ) {
      chart.yAxis.showMaxMin( ( attrs.yaxisshowmaxmin === 'true' ) );
    }
    if ( attrs.yaxishighlightzero ) {
      chart.yAxis.highlightZero( ( attrs.yaxishighlightzero === 'true' ) );
    }
    if ( attrs.yaxisrotatelabels ) {
      chart.yAxis.rotateLabels( ( +attrs.yaxisrotatelabels ) );
    }
    if ( attrs.yaxisrotateylabel ) {
      chart.yAxis.rotateYLabel( ( attrs.yaxisrotateylabel === 'true' ) );
    }
    if ( attrs.yaxisstaggerlabels ) {
      chart.yAxis.staggerLabels( ( attrs.yaxisstaggerlabels === 'true' ) );
    }
    if ( attrs.yaxislabeldistance ) {
      chart.yAxis.axisLabelDistance( ( +attrs.yaxislabeldistance ) );
    }
  }

  function configureY1axis( chart, scope, attrs ) {
    if ( attrs.y1axisticks ) {
      chart.y1Axis.scale().ticks( attrs.y1axisticks );
    }
    if ( attrs.y1axistickvalues ) {
      if ( Array.isArray( scope.$eval( attrs.y1axistickvalues ) ) ) {
        chart.y1Axis.tickValues( scope.$eval( attrs.y1axistickvalues ) );
      } else if ( typeof scope.y1axistickvalues() === 'function' ) {
        chart.y1Axis.tickValues( scope.y1axistickvalues() );
      }
    }
    if ( attrs.y1axisticksubdivide ) {
      chart.y1Axis.tickSubdivide( scope.y1axisticksubdivide() );
    }
    if ( attrs.y1axisticksize ) {
      chart.y1Axis.tickSize( scope.y1axisticksize() );
    }
    if ( attrs.y1axistickpadding ) {
      chart.y1Axis.tickPadding( scope.y1axistickpadding() );
    }
    if ( attrs.y1axistickformat ) {
      chart.y1Axis.tickFormat( scope.y1axistickformat() );
    }
    if ( attrs.y1axislabel ) {
      chart.y1Axis.axisLabel( attrs.y1axislabel );
    }
    if ( attrs.y1axisscale ) {
      chart.y1Axis.yScale( scope.y1axisscale() );
    }
    if ( attrs.y1axisdomain ) {
      if ( Array.isArray( scope.$eval( attrs.y1axisdomain ) ) ) {
        chart.y1Axis.domain( scope.$eval( attrs.y1axisdomain ) );
      } else if ( typeof scope.y1axisdomain() === 'function' ) {
        chart.y1Axis.domain( scope.y1axisdomain() );
      }
    }
    if ( attrs.y1axisrange ) {
      if ( Array.isArray( scope.$eval( attrs.y1axisrange ) ) ) {
        chart.y1Axis.range( scope.$eval( attrs.y1axisrange ) );
      } else if ( typeof scope.y1axisrange() === 'function' ) {
        chart.y1Axis.range( scope.y1axisrange() );
      }
    }
    if ( attrs.y1axisrangeband ) {
      chart.y1Axis.rangeBand( scope.y1axisrangeband() );
    }
    if ( attrs.y1axisrangebands ) {
      chart.y1Axis.rangeBands( scope.y1axisrangebands() );
    }
    if ( attrs.y1axisshowmaxmin ) {
      chart.y1Axis.showMaxMin( ( attrs.y1axisshowmaxmin === 'true' ) );
    }
    if ( attrs.y1axishighlightzero ) {
      chart.y1Axis.highlightZero( ( attrs.y1axishighlightzero === 'true' ) );
    }
    if ( attrs.y1axisrotatelabels ) {
      chart.y1Axis.rotateLabels( ( +scope.y1axisrotatelabels ) );
    }
    if ( attrs.y1axisrotateylabel ) {
      chart.y1Axis.rotateYLabel( ( attrs.y1axisrotateylabel === 'true' ) );
    }
    if ( attrs.y1axisstaggerlabels ) {
      chart.y1Axis.staggerlabels( ( attrs.y1axisstaggerlabels === 'true' ) );
    }
    if ( attrs.y1axislabeldistance ) {
      chart.y1Axis.axisLabelDistance( ( +attrs.y1axislabeldistance ) );
    }
  }

  function configureY2axis( chart, scope, attrs ) {
    if ( attrs.y2axisticks ) {
      chart.y2Axis.scale().ticks( attrs.y2axisticks );
    }
    if ( attrs.y2axistickvalues ) {
      chart.y2Axis.tickValues( scope.$eval( attrs.y2axistickvalues ) );
    }
    if ( attrs.y2axisticksubdivide ) {
      chart.y2Axis.tickSubdivide( scope.y2axisticksubdivide() );
    }
    if ( attrs.y2axisticksize ) {
      chart.y2Axis.tickSize( scope.y2axisticksize() );
    }
    if ( attrs.y2axistickpadding ) {
      chart.y2Axis.tickPadding( scope.y2axistickpadding() );
    }
    if ( attrs.y2axistickformat ) {
      chart.y2Axis.tickFormat( scope.y2axistickformat() );
    }
    if ( attrs.y2axislabel ) {
      chart.y2Axis.axisLabel( attrs.y2axislabel );
    }
    if ( attrs.y2axisscale ) {
      chart.y2Axis.yScale( scope.y2axisscale() );
    }
    if ( attrs.y2axisdomain ) {
      if ( Array.isArray( scope.$eval( attrs.y2axisdomain ) ) ) {
        chart.y2Axis.domain( scope.$eval( attrs.y2axisdomain ) );
      } else if ( typeof scope.y2axisdomain() === 'function' ) {
        chart.y2Axis.domain( scope.y2axisdomain() );
      }
    }
    if ( attrs.y2axisrange ) {
      if ( Array.isArray( scope.$eval( attrs.y2axisrange ) ) ) {
        chart.y2Axis.range( scope.$eval( attrs.y2axisrange ) );
      } else if ( typeof scope.y2axisrange() === 'function' ) {
        chart.y2Axis.range( scope.y2axisrange() );
      }
    }
    if ( attrs.y2axisrangeband ) {
      chart.y2Axis.rangeBand( scope.y2axisrangeband() );
    }
    if ( attrs.y2axisrangebands ) {
      chart.y2Axis.rangeBands( scope.y2axisrangebands() );
    }
    if ( attrs.y2axisshowmaxmin ) {
      chart.y2Axis.showMaxMin( ( attrs.y2axisshowmaxmin === 'true' ) );
    }
    if ( attrs.y2axishighlightzero ) {
      chart.y2Axis.highlightZero( ( attrs.y2axishighlightzero === 'true' ) );
    }
    if ( attrs.y2axisrotatelabels ) {
      chart.y2Axis.rotateLabels( ( +scope.y2axisrotatelabels ) );
    }
    if ( attrs.y2axisrotateylabel ) {
      chart.y2Axis.rotateYLabel( ( attrs.y2axisrotateylabel === 'true' ) );
    }
    if ( attrs.y2axisstaggerlabels ) {
      chart.y2Axis.staggerlabels( ( attrs.y2axisstaggerlabels === 'true' ) );
    }
    if ( attrs.y2axislabeldistance ) {
      chart.y2Axis.axisLabelDistance( ( +attrs.y2axislabeldistance ) );
    }
  }

  function initializeMargin( scope, attrs ) {
    var margin = scope.$eval( attrs.margin ) || {
      left: 50,
      top: 50,
      bottom: 50,
      right: 50
    };
    if ( typeof margin !== 'object' ) {
      // we were passed a vanilla int, convert to full margin object
      margin = {
        left: margin,
        top: margin,
        bottom: margin,
        right: margin
      };
    }
    scope.margin = margin;
  }

  function getD3Selector( attrs, element ) {
    if ( !attrs.id ) {
      //if an id is not supplied, create a random id.
      var dataAttributeChartID;
      if ( !attrs[ 'data-chartid' ] ) {
        dataAttributeChartID = 'chartid' + Math.floor( Math.random() * 1000000001 );
        angular.element( element ).attr( 'data-chartid', dataAttributeChartID );
      } else {
        dataAttributeChartID = attrs[ 'data-chartid' ];
      }
      return '[data-chartid=' + dataAttributeChartID + ']';
    } else {
      return '#' + attrs.id;
    }
  }

  function checkElementID( scope, attrs, element, chart, data ) {
    configureXaxis( chart, scope, attrs );
    configureX2axis( chart, scope, attrs );
    configureYaxis( chart, scope, attrs );
    configureY1axis( chart, scope, attrs );
    configureY2axis( chart, scope, attrs );
    configureLegend( chart, scope, attrs );
    processEvents( chart, scope );
    var d3Select = getD3Selector( attrs, element );
    if ( angular.isArray( data ) && data.length === 0 ) {
      d3.select( d3Select + ' svg' ).remove();
    }
    if ( d3.select( d3Select + ' svg' ).empty() ) {
      d3.select( d3Select ).append( 'svg' );
    }
    d3.select( d3Select + ' svg' ).attr( 'viewBox', '0 0 ' + scope.width + ' ' + scope.height ).datum( data ).transition().duration( attrs.transitionduration === undefined ? 250 : +attrs.transitionduration ).call( chart );
  }

  function updateDimensions( scope, attrs, element, chart ) {
    if ( chart ) {
      chart.width( scope.width ).height( scope.height );
      var d3Select = getD3Selector( attrs, element );
      d3.select( d3Select + ' svg' ).attr( 'viewBox', '0 0 ' + scope.width + ' ' + scope.height );
      nv.utils.windowResize( chart );
      scope.chart.update();
    }
  }
  angular.module( 'nvd3ChartDirectives', [] ).directive( 'nvd3LineChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showxaxis: '@',
          showyaxis: '@',
          rightalignyaxis: '@',
          defaultstate: '@',
          nodata: '@',
          margin: '&',
          tooltipcontent: '&',
          color: '&',
          x: '&',
          y: '&',
          forcex: '@',
          forcey: '@',
          isArea: '@',
          interactive: '@',
          clipedge: '@',
          clipvoronoi: '@',
          interpolate: '@',
          callback: '&',
          useinteractiveguideline: '@',
          xaxisorient: '&',
          xaxisticks: '@',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.lineChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceX( attrs.forcex === undefined ? [] : scope.$eval( attrs.forcex ) ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).showXAxis( attrs.showxaxis === undefined ? false : attrs.showxaxis === 'true' ).showYAxis( attrs.showyaxis === undefined ? false : attrs.showyaxis === 'true' ).rightAlignYAxis( attrs.rightalignyaxis === undefined ? false : attrs.rightalignyaxis === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).clipEdge( attrs.clipedge === undefined ? false : attrs.clipedge === 'true' ).clipVoronoi( attrs.clipvoronoi === undefined ? false : attrs.clipvoronoi === 'true' ).interpolate( attrs.interpolate === undefined ? 'linear' : attrs.interpolate ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).isArea( attrs.isarea === undefined ? function ( d ) {
                    return d.area;
                  } : function () {
                    return attrs.isarea === 'true';
                  } );
                  if ( attrs.useinteractiveguideline ) {
                    chart.useInteractiveGuideline( attrs.useinteractiveguideline === undefined ? false : attrs.useinteractiveguideline === 'true' );
                  }
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3CumulativeLineChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showxaxis: '@',
          showyaxis: '@',
          rightalignyaxis: '@',
          defaultstate: '@',
          nodata: '@',
          margin: '&',
          tooltipcontent: '&',
          color: '&',
          x: '&',
          y: '&',
          forcex: '@',
          forcey: '@',
          isArea: '@',
          interactive: '@',
          clipedge: '@',
          clipvoronoi: '@',
          usevoronoi: '@',
          average: '&',
          rescaley: '@',
          callback: '&',
          useinteractiveguideline: '@',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.cumulativeLineChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceX( attrs.forcex === undefined ? [] : scope.$eval( attrs.forcex ) ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).showXAxis( attrs.showxaxis === undefined ? false : attrs.showxaxis === 'true' ).showYAxis( attrs.showyaxis === undefined ? false : attrs.showyaxis === 'true' ).rightAlignYAxis( attrs.rightalignyaxis === undefined ? false : attrs.rightalignyaxis === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).clipEdge( attrs.clipedge === undefined ? false : attrs.clipedge === 'true' ).clipVoronoi( attrs.clipvoronoi === undefined ? false : attrs.clipvoronoi === 'true' ).useVoronoi( attrs.usevoronoi === undefined ? false : attrs.usevoronoi === 'true' ).average( attrs.average === undefined ? function ( d ) {
                    return d.average;
                  } : scope.average() ).color( attrs.color === undefined ? d3.scale.category10().range() : scope.color() ).isArea( attrs.isarea === undefined ? function ( d ) {
                    return d.area;
                  } : attrs.isarea === 'true' );
                  //.rescaleY(attrs.rescaley === undefined ? false : (attrs.rescaley === 'true'));
                  if ( attrs.useinteractiveguideline ) {
                    chart.useInteractiveGuideline( attrs.useinteractiveguideline === undefined ? false : attrs.useinteractiveguideline === 'true' );
                  }
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3StackedAreaChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showcontrols: '@',
          nodata: '@',
          margin: '&',
          tooltipcontent: '&',
          color: '&',
          x: '&',
          y: '&',
          forcex: '@',
          forcey: '@',
          forcesize: '@',
          interactive: '@',
          usevoronoi: '@',
          clipedge: '@',
          interpolate: '@',
          style: '@',
          order: '@',
          offset: '@',
          size: '&',
          xScale: '&',
          yScale: '&',
          xDomain: '&',
          yDomain: '&',
          xRange: '&',
          yRange: '&',
          sizeDomain: '&',
          callback: '&',
          showxaxis: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          showyaxis: '&',
          useinteractiveguideline: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.stackedAreaChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceX( attrs.forcex === undefined ? [] : scope.$eval( attrs.forcex ) ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).size( attrs.size === undefined ? function ( d ) {
                    return d.size === undefined ? 1 : d.size;
                  } : scope.size() ).forceSize( attrs.forcesize === undefined ? [] : scope.$eval( attrs.forcesize ) ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).showControls( attrs.showcontrols === undefined ? false : attrs.showcontrols === 'true' ).showXAxis( attrs.showxaxis === undefined ? false : attrs.showxaxis === 'true' ).showYAxis( attrs.showyaxis === undefined ? false : attrs.showyaxis === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).clipEdge( attrs.clipedge === undefined ? false : attrs.clipedge === 'true' ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() );
                  if ( attrs.useinteractiveguideline ) {
                    chart.useInteractiveGuideline( attrs.useinteractiveguideline === undefined ? false : attrs.useinteractiveguideline === 'true' );
                  }
                  if ( attrs.usevoronoi ) {
                    chart.useVoronoi( attrs.usevoronoi === 'true' );
                  }
                  if ( attrs.style ) {
                    chart.style( attrs.style );
                  }
                  if ( attrs.order ) {
                    chart.order( attrs.order );
                  }
                  if ( attrs.offset ) {
                    chart.offset( attrs.offset );
                  }
                  if ( attrs.interpolate ) {
                    chart.interpolate( attrs.interpolate );
                  }
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  if ( attrs.xscale ) {
                    chart.xScale( scope.xscale() );
                  }
                  if ( attrs.yscale ) {
                    chart.yScale( scope.yscale() );
                  }
                  if ( attrs.xdomain ) {
                    if ( Array.isArray( scope.$eval( attrs.xdomain ) ) ) {
                      chart.xDomain( scope.$eval( attrs.xdomain ) );
                    } else if ( typeof scope.xdomain() === 'function' ) {
                      chart.xDomain( scope.xdomain() );
                    }
                  }
                  if ( attrs.ydomain ) {
                    if ( Array.isArray( scope.$eval( attrs.ydomain ) ) ) {
                      chart.yDomain( scope.$eval( attrs.ydomain ) );
                    } else if ( typeof scope.ydomain() === 'function' ) {
                      chart.yDomain( scope.ydomain() );
                    }
                  }
                  if ( attrs.sizedomain ) {
                    chart.sizeDomain( scope.sizedomain() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3MultiBarChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          tooltipcontent: '&',
          color: '&',
          showcontrols: '@',
          nodata: '@',
          reducexticks: '@',
          staggerlabels: '@',
          rotatelabels: '@',
          margin: '&',
          x: '&',
          y: '&',
          forcey: '@',
          delay: '@',
          stacked: '@',
          callback: '&',
          showxaxis: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          showyaxis: '&',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.multiBarChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).showControls( attrs.showcontrols === undefined ? false : attrs.showcontrols === 'true' ).showXAxis( attrs.showxaxis === undefined ? false : attrs.showxaxis === 'true' ).showYAxis( attrs.showyaxis === undefined ? false : attrs.showyaxis === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).reduceXTicks( attrs.reducexticks === undefined ? false : attrs.reducexticks === 'true' ).staggerLabels( attrs.staggerlabels === undefined ? false : attrs.staggerlabels === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).rotateLabels( attrs.rotatelabels === undefined ? 0 : attrs.rotatelabels ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).delay( attrs.delay === undefined ? 1200 : attrs.delay ).stacked( attrs.stacked === undefined ? false : attrs.stacked === 'true' );
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3DiscreteBarChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          tooltips: '@',
          showxaxis: '@',
          showyaxis: '@',
          tooltipcontent: '&',
          staggerlabels: '@',
          color: '&',
          margin: '&',
          nodata: '@',
          x: '&',
          y: '&',
          forcey: '@',
          showvalues: '@',
          valueformat: '&',
          callback: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.discreteBarChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).showValues( attrs.showvalues === undefined ? false : attrs.showvalues === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).showXAxis( attrs.showxaxis === undefined ? false : attrs.showxaxis === 'true' ).showYAxis( attrs.showyaxis === undefined ? false : attrs.showyaxis === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).staggerLabels( attrs.staggerlabels === undefined ? false : attrs.staggerlabels === 'true' ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() );
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  if ( attrs.valueformat ) {
                    chart.valueFormat( scope.valueformat() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3HistoricalBarChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          tooltips: '@',
          tooltipcontent: '&',
          color: '&',
          margin: '&',
          nodata: '@',
          x: '&',
          y: '&',
          forcey: '@',
          isarea: '@',
          interactive: '@',
          clipedge: '@',
          clipvoronoi: '@',
          interpolate: '@',
          highlightPoint: '@',
          clearHighlights: '@',
          callback: '&',
          useinteractiveguideline: '@',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.historicalBarChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() );
                  if ( attrs.useinteractiveguideline ) {
                    chart.useInteractiveGuideline( attrs.useinteractiveguideline === undefined ? false : attrs.useinteractiveguideline === 'true' );
                  }
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  if ( attrs.valueformat ) {
                    chart.valueFormat( scope.valueformat() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3MultiBarHorizontalChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          tooltipcontent: '&',
          color: '&',
          showcontrols: '@',
          margin: '&',
          nodata: '@',
          x: '&',
          y: '&',
          forcey: '@',
          stacked: '@',
          showvalues: '@',
          valueformat: '&',
          callback: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.multiBarHorizontalChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).showXAxis( attrs.showxaxis === undefined ? false : attrs.showxaxis === 'true' ).showYAxis( attrs.showyaxis === undefined ? false : attrs.showyaxis === 'true' ).forceY( attrs.forcey === undefined ? [ 0 ] : scope.$eval( attrs.forcey ) ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).showControls( attrs.showcontrols === undefined ? false : attrs.showcontrols === 'true' ).showValues( attrs.showvalues === undefined ? false : attrs.showvalues === 'true' ).stacked( attrs.stacked === undefined ? false : attrs.stacked === 'true' );
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  if ( attrs.valueformat ) {
                    chart.valueFormat( scope.valueformat() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3PieChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlabels: '@',
          showlegend: '@',
          donutLabelsOutside: '@',
          pieLabelsOutside: '@',
          labelType: '@',
          nodata: '@',
          margin: '&',
          x: '&',
          y: '&',
          color: '&',
          donut: '@',
          donutRatio: '@',
          labelthreshold: '@',
          description: '&',
          tooltips: '@',
          tooltipcontent: '&',
          valueFormat: '&',
          callback: '&',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.pieChart().x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).width( scope.width ).height( scope.height ).margin( scope.margin ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).showLabels( attrs.showlabels === undefined ? false : attrs.showlabels === 'true' ).labelThreshold( attrs.labelthreshold === undefined ? 0.02 : attrs.labelthreshold ).labelType( attrs.labeltype === undefined ? 'key' : attrs.labeltype ).pieLabelsOutside( attrs.pielabelsoutside === undefined ? true : attrs.pielabelsoutside === 'true' ).valueFormat( attrs.valueformat === undefined ? d3.format( ',.2f' ) : attrs.valueformat ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).description( attrs.description === undefined ? function ( d ) {
                    return d.description;
                  } : scope.description() ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).donutLabelsOutside( attrs.donutlabelsoutside === undefined ? false : attrs.donutlabelsoutside === 'true' ).donut( attrs.donut === undefined ? false : attrs.donut === 'true' ).donutRatio( attrs.donutratio === undefined ? 0.5 : attrs.donutratio );
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3ScatterChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showcontrols: '@',
          showDistX: '@',
          showDistY: '@',
          rightAlignYAxis: '@',
          fisheye: '@',
          xPadding: '@',
          yPadding: '@',
          tooltipContent: '&',
          tooltipXContent: '&',
          tooltipYContent: '&',
          color: '&',
          margin: '&',
          nodata: '@',
          transitionDuration: '@',
          shape: '&',
          onlyCircles: '@',
          interactive: '@',
          x: '&',
          y: '&',
          size: '&',
          forceX: '@',
          forceY: '@',
          forceSize: '@',
          xrange: '&',
          xdomain: '&',
          xscale: '&',
          yrange: '&',
          ydomain: '&',
          yscale: '&',
          sizerange: '&',
          sizedomain: '&',
          zscale: '&',
          callback: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.scatterChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d.x;
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d.y;
                  } : scope.y() ).size( attrs.size === undefined ? function ( d ) {
                    return d.size === undefined ? 1 : d.size;
                  } : scope.size() ).forceX( attrs.forcex === undefined ? [] : scope.$eval( attrs.forcex ) ).forceY( attrs.forcey === undefined ? [] : scope.$eval( attrs.forcey ) ).forceSize( attrs.forcesize === undefined ? [] : scope.$eval( attrs.forcesize ) ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).tooltipContent( attrs.tooltipContent === undefined ? null : scope.tooltipContent() ).tooltipXContent( attrs.tooltipxcontent === undefined ? function ( key, x ) {
                    return '<strong>' + x + '</strong>';
                  } : scope.tooltipXContent() ).tooltipYContent( attrs.tooltipycontent === undefined ? function ( key, x, y ) {
                    return '<strong>' + y + '</strong>';
                  } : scope.tooltipYContent() ).showControls( attrs.showcontrols === undefined ? false : attrs.showcontrols === 'true' ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).showDistX( attrs.showdistx === undefined ? false : attrs.showdistx === 'true' ).showDistY( attrs.showdisty === undefined ? false : attrs.showdisty === 'true' ).xPadding( attrs.xpadding === undefined ? 0 : +attrs.xpadding ).yPadding( attrs.ypadding === undefined ? 0 : +attrs.ypadding ).fisheye( attrs.fisheye === undefined ? 0 : +attrs.fisheye ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).transitionDuration( attrs.transitionduration === undefined ? 250 : +attrs.transitionduration );
                  if ( attrs.shape ) {
                    chart.scatter.onlyCircles( false );
                    chart.scatter.shape( attrs.shape === undefined ? function ( d ) {
                      return d.shape || 'circle';
                    } : scope.shape() );
                  }
                  //'pointActive', 'clipVoronoi', 'clipRadius', 'useVoronoi'
                  if ( attrs.xdomain ) {
                    if ( Array.isArray( scope.$eval( attrs.xdomain ) ) ) {
                      chart.xDomain( scope.$eval( attrs.xdomain ) );
                    } else if ( typeof scope.xdomain() === 'function' ) {
                      chart.xDomain( scope.xdomain() );
                    }
                  }
                  if ( attrs.ydomain ) {
                    if ( Array.isArray( scope.$eval( attrs.ydomain ) ) ) {
                      chart.yDomain( scope.$eval( attrs.ydomain ) );
                    } else if ( typeof scope.ydomain() === 'function' ) {
                      chart.yDomain( scope.ydomain() );
                    }
                  }
                  if ( attrs.xscale ) {
                    chart.xDomain( scope.xdomain() );
                    chart.xRange( scope.xrange() );
                    chart.xScale( scope.xscale() );
                  }
                  if ( attrs.yscale ) {
                    chart.yDomain( scope.ydomain() );
                    chart.yRange( scope.yrange() );
                    chart.yScale( scope.yscale() );
                  }
                  if ( attrs.zscale ) {
                    chart.sizeDomain( scope.sizedomain() );
                    chart.sizeRange( scope.sizerange() );
                    chart.zScale( scope.zscale() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3ScatterPlusLineChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showcontrols: '@',
          showDistX: '@',
          showDistY: '@',
          rightAlignYAxis: '@',
          fisheye: '@',
          tooltipContent: '&',
          tooltipXContent: '&',
          tooltipYContent: '&',
          color: '&',
          margin: '&',
          nodata: '@',
          transitionDuration: '@',
          shape: '&',
          onlyCircles: '@',
          interactive: '@',
          x: '&',
          y: '&',
          size: '&',
          forceX: '@',
          forceY: '@',
          forceSize: '@',
          xrange: '&',
          xdomain: '&',
          xscale: '&',
          yrange: '&',
          ydomain: '&',
          yscale: '&',
          sizerange: '&',
          sizedomain: '&',
          zscale: '&',
          callback: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.scatterPlusLineChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d.x;
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d.y;
                  } : scope.y() ).size( attrs.size === undefined ? function ( d ) {
                    return d.size === undefined ? 1 : d.size;
                  } : scope.size() ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).tooltipContent( attrs.tooltipContent === undefined ? null : scope.tooltipContent() ).tooltipXContent( attrs.tooltipxcontent === undefined ? function ( key, x ) {
                    return '<strong>' + x + '</strong>';
                  } : scope.tooltipXContent() ).tooltipYContent( attrs.tooltipycontent === undefined ? function ( key, x, y ) {
                    return '<strong>' + y + '</strong>';
                  } : scope.tooltipYContent() ).showControls( attrs.showcontrols === undefined ? false : attrs.showcontrols === 'true' ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).showDistX( attrs.showdistx === undefined ? false : attrs.showdistx === 'true' ).showDistY( attrs.showdisty === undefined ? false : attrs.showdisty === 'true' ).fisheye( attrs.fisheye === undefined ? 0 : +attrs.fisheye ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).transitionDuration( attrs.transitionduration === undefined ? 250 : +attrs.transitionduration );
                  if ( attrs.shape ) {
                    chart.scatter.onlyCircles( false );
                    chart.scatter.shape( attrs.shape === undefined ? function ( d ) {
                      return d.shape || 'circle';
                    } : scope.shape() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          } );
        }
      };
    }
  ] ).directive( 'nvd3LinePlusBarChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showxaxis: '@',
          showyaxis: '@',
          forceX: '@',
          forceY: '@',
          forceY2: '@',
          rightalignyaxis: '@',
          defaultstate: '@',
          nodata: '@',
          margin: '&',
          tooltipcontent: '&',
          color: '&',
          x: '&',
          y: '&',
          clipvoronoi: '@',
          interpolate: '@',
          callback: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          y1axisorient: '&',
          y1axisticks: '&',
          y1axistickvalues: '&y1axistickvalues',
          y1axisticksubdivide: '&',
          y1axisticksize: '&',
          y1axistickpadding: '&',
          y1axistickformat: '&',
          y1axislabel: '@',
          y1axisscale: '&',
          y1axisdomain: '&',
          y1axisrange: '&',
          y1axisrangeband: '&',
          y1axisrangebands: '&',
          y1axisshowmaxmin: '@',
          y1axishighlightzero: '@',
          y1axisrotatelabels: '@',
          y1axisrotateylabel: '@',
          y1axisstaggerlabels: '@',
          y1axisaxislabeldistance: '@',
          y2axisorient: '&',
          y2axisticks: '&',
          y2axistickvalues: '&y2axistickvalues',
          y2axisticksubdivide: '&',
          y2axisticksize: '&',
          y2axistickpadding: '&',
          y2axistickformat: '&',
          y2axislabel: '@',
          y2axisscale: '&',
          y2axisdomain: '&',
          y2axisrange: '&',
          y2axisrangeband: '&',
          y2axisrangebands: '&',
          y2axisshowmaxmin: '@',
          y2axishighlightzero: '@',
          y2axisrotatelabels: '@',
          y2axisrotateylabel: '@',
          y2axisstaggerlabels: '@',
          y2axisaxislabeldistance: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@',
          lineinteractive: '@',
          barinteractive: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.linePlusBarChart().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).interpolate( attrs.interpolate === undefined ? 'linear' : attrs.interpolate ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() );
                  if ( attrs.forcex ) {
                    chart.lines.forceX( scope.$eval( attrs.forcex ) );
                    chart.bars.forceX( scope.$eval( attrs.forcex ) );
                  }
                  if ( attrs.forcey ) {
                    chart.lines.forceY( scope.$eval( attrs.forcey ) );
                    chart.bars.forceY( scope.$eval( attrs.forcey ) );
                  }
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  if ( attrs.lineinteractive && attrs.lineinteractive === 'false' ) {
                    chart.lines.interactive( false );
                  }
                  if ( attrs.barinteractive && attrs.barinteractive === 'false' ) {
                    chart.bars.interactive( false );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3LineWithFocusChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          height2: '@',
          id: '@',
          showlegend: '@',
          tooltips: '@',
          showxaxis: '@',
          showyaxis: '@',
          rightalignyaxis: '@',
          defaultstate: '@',
          nodata: '@',
          margin: '&',
          margin2: '&',
          tooltipcontent: '&',
          color: '&',
          x: '&',
          y: '&',
          forceX: '@',
          forceY: '@',
          clipedge: '@',
          clipvoronoi: '@',
          interpolate: '@',
          isArea: '@',
          size: '&',
          defined: '&',
          interactive: '@',
          callback: '&',
          xaxisorient: '&',
          xaxisticks: '&',
          xaxistickvalues: '&xaxistickvalues',
          xaxisticksubdivide: '&',
          xaxisticksize: '&',
          xaxistickpadding: '&',
          xaxistickformat: '&',
          xaxislabel: '@',
          xaxisscale: '&',
          xaxisdomain: '&',
          xaxisrange: '&',
          xaxisrangeband: '&',
          xaxisrangebands: '&',
          xaxisshowmaxmin: '@',
          xaxishighlightzero: '@',
          xaxisrotatelabels: '@',
          xaxisrotateylabel: '@',
          xaxisstaggerlabels: '@',
          xaxisaxislabeldistance: '@',
          x2axisorient: '&',
          x2axisticks: '&',
          x2axistickvalues: '&xaxistickvalues',
          x2axisticksubdivide: '&',
          x2axisticksize: '&',
          x2axistickpadding: '&',
          x2axistickformat: '&',
          x2axislabel: '@',
          x2axisscale: '&',
          x2axisdomain: '&',
          x2axisrange: '&',
          x2axisrangeband: '&',
          x2axisrangebands: '&',
          x2axisshowmaxmin: '@',
          x2axishighlightzero: '@',
          x2axisrotatelables: '@',
          x2axisrotateylabel: '@',
          x2axisstaggerlabels: '@',
          yaxisorient: '&',
          yaxisticks: '&',
          yaxistickvalues: '&yaxistickvalues',
          yaxisticksubdivide: '&',
          yaxisticksize: '&',
          yaxistickpadding: '&',
          yaxistickformat: '&',
          yaxislabel: '@',
          yaxisscale: '&',
          yaxisdomain: '&',
          yaxisrange: '&',
          yaxisrangeband: '&',
          yaxisrangebands: '&',
          yaxisshowmaxmin: '@',
          yaxishighlightzero: '@',
          yaxisrotatelabels: '@',
          yaxisrotateylabel: '@',
          yaxisstaggerlabels: '@',
          yaxislabeldistance: '@',
          y2axisorient: '&',
          y2axisticks: '&',
          y2axistickvalues: '&',
          y2axisticksubdivide: '&',
          y2axisticksize: '&',
          y2axistickpadding: '&',
          y2axistickformat: '&',
          y2axislabel: '@',
          y2axisscale: '&',
          y2axisdomain: '&',
          y2axisrange: '&',
          y2axisrangeband: '&',
          y2axisrangebands: '&',
          y2axisshowmaxmin: '@',
          y2axishighlightzero: '@',
          y2axisrotatelabels: '@',
          y2axisrotateylabel: '@',
          y2axisstaggerlabels: '@',
          legendmargin: '&',
          legendwidth: '@',
          legendheight: '@',
          legendkey: '@',
          legendcolor: '&',
          legendalign: '@',
          legendrightalign: '@',
          legendupdatestate: '@',
          legendradiobuttonmode: '@',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  //setup height 2
                  //height 2 is 100
                  //margin
                  //nvd3 default is {top: 30, right: 30, bottom: 30, left: 60}
                  //setup margin 2
                  //nvd3 default is {top: 0, right: 30, bottom: 20, left: 60}
                  if ( attrs.margin2 ) {
                    var margin2 = scope.$eval( attrs.margin2 );
                    if ( typeof margin2 !== 'object' ) {
                      // we were passed a vanilla int, convert to full margin object
                      margin2 = {
                        left: margin2,
                        top: margin2,
                        bottom: margin2,
                        right: margin2
                      };
                    }
                    scope.margin2 = margin2;
                  } else {
                    scope.margin2 = {
                      top: 0,
                      right: 30,
                      bottom: 20,
                      left: 60
                    };
                  }
                  //'xDomain', 'yDomain', 'xRange', 'yRange', ''clipEdge', 'clipVoronoi'
                  var chart = nv.models.lineWithFocusChart().width( scope.width ).height( scope.height ).height2( attrs.height2 === undefined ? 100 : +attrs.height2 ).margin( scope.margin ).margin2( scope.margin2 ).x( attrs.x === undefined ? function ( d ) {
                    return d[ 0 ];
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d[ 1 ];
                  } : scope.y() ).forceX( attrs.forcex === undefined ? [] : scope.$eval( attrs.forcex ) ).forceY( attrs.forcey === undefined ? [] : scope.$eval( attrs.forcey ) ).showLegend( attrs.showlegend === undefined ? false : attrs.showlegend === 'true' ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata ).color( attrs.color === undefined ? nv.utils.defaultColor() : scope.color() ).isArea( attrs.isarea === undefined ? function ( d ) {
                    return d.area;
                  } : function () {
                    return attrs.isarea === 'true';
                  } ).size( attrs.size === undefined ? function ( d ) {
                    return d.size === undefined ? 1 : d.size;
                  } : scope.size() ).interactive( attrs.interactive === undefined ? false : attrs.interactive === 'true' ).clipEdge( attrs.clipedge === undefined ? false : attrs.clipedge === 'true' ).clipVoronoi( attrs.clipvoronoi === undefined ? false : attrs.clipvoronoi === 'true' ).interpolate( attrs.interpolate === undefined ? 'linear' : attrs.interpolate );
                  if ( attrs.defined ) {
                    chart.defined( scope.defined() );
                  }
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3BulletChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          margin: '&',
          tooltips: '@',
          tooltipcontent: '&',
          orient: '@',
          ranges: '&',
          markers: '&',
          measures: '&',
          tickformat: '&',
          nodata: '@',
          callback: '&',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.bulletChart().width( scope.width ).height( scope.height ).margin( scope.margin ).orient( attrs.orient === undefined ? 'left' : attrs.orient ).tickFormat( attrs.tickformat === undefined ? null : scope.tickformat() ).tooltips( attrs.tooltips === undefined ? false : attrs.tooltips === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata );
                  if ( attrs.tooltipcontent ) {
                    chart.tooltipContent( scope.tooltipcontent() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3SparklineChart', [
    '$filter',
    function ( $filter ) {
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          margin: '&',
          x: '&',
          y: '&',
          color: '&',
          xscale: '&',
          yscale: '&',
          showvalue: '@',
          alignvalue: '@',
          rightalignvalue: '@',
          nodata: '@',
          callback: '&',
          xtickformat: '&',
          ytickformat: '&',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            $scope.d3Call = function ( data, chart ) {
              checkElementID( $scope, $attrs, $element, chart, data );
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  initializeMargin( scope, attrs );
                  var chart = nv.models.sparklinePlus().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d.x;
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d.y;
                  } : scope.y() ).xTickFormat( attrs.xtickformat === undefined ? d3.format( ',r' ) : scope.xtickformat() ).yTickFormat( attrs.ytickformat === undefined ? d3.format( ',.2f' ) : scope.ytickformat() ).color( attrs.color === undefined ? nv.utils.getColor( [ '#000' ] ) : scope.color() ).showValue( attrs.showvalue === undefined ? true : attrs.showvalue === 'true' ).alignValue( attrs.alignvalue === undefined ? true : attrs.alignvalue === 'true' ).rightAlignValue( attrs.rightalignvalue === undefined ? false : attrs.rightalignvalue === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata );
                  if ( attrs.xScale ) {
                    chart.xScale( scope.xScale() );
                  }
                  if ( attrs.yScale ) {
                    chart.yScale( scope.yScale() );
                  }
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ).directive( 'nvd3SparklineWithBandlinesChart', [
    '$filter',
    function ( $filter ) {
      /**
       * http://www.perceptualedge.com/articles/visual_business_intelligence/introducing_bandlines.pdf
       * You need five primary facts about a set of time-series values to construct a bandline:
       * 1) the lowest value,
       * 2) the 25th percentile (i.e., the point at and below which the lowest 25% of the values reside),
       * 3) the median (a.k.a., the 50th percentile, the point at and below which 50% of the values reside),
       * 4) the 75th percentile (i.e., the point at and below which 75% of the values reside), and
       * 5) the highest value.
       */
      return {
        restrict: 'EA',
        scope: {
          data: '=',
          filtername: '=',
          filtervalue: '=',
          width: '@',
          height: '@',
          id: '@',
          margin: '&',
          x: '&',
          y: '&',
          color: '&',
          xscale: '&',
          yscale: '&',
          showvalue: '@',
          alignvalue: '@',
          rightalignvalue: '@',
          nodata: '@',
          callback: '&',
          xtickformat: '&',
          ytickformat: '&',
          objectequality: '@',
          transitionduration: '@'
        },
        controller: [
          '$scope',
          '$element',
          '$attrs',
          function ( $scope, $element, $attrs ) {
            //expect scope to contain bandlineProperties
            $scope.d3Call = function ( data, chart ) {
              var dataAttributeChartID;
              //randomly generated if id attribute doesn't exist
              var selectedChart;
              var sLineSelection;
              var bandlineData;
              var bandLines;
              if ( !$attrs.id ) {
                dataAttributeChartID = 'chartid' + Math.floor( Math.random() * 1000000001 );
                angular.element( $element ).attr( 'data-chartid', dataAttributeChartID );
                selectedChart = d3.select( '[data-iem-chartid=' + dataAttributeChartID + '] svg' ).attr( 'height', $scope.height ).attr( 'width', $scope.width ).datum( data );
                //chart.yScale()($scope.bandlineProperties.median)
                //var sLineSelection = d3.select('svg#' + $attrs.id + ' g.nvd3.nv-wrap.nv-sparkline');
                sLineSelection = d3.select( '[data-iem-chartid=' + dataAttributeChartID + '] svg' + ' g.nvd3.nv-wrap.nv-sparkline' );
                bandlineData = [
                  $scope.bandlineProperties.min,
                  $scope.bandlineProperties.twentyFithPercentile,
                  $scope.bandlineProperties.median,
                  $scope.bandlineProperties.seventyFithPercentile,
                  $scope.bandlineProperties.max
                ];
                bandLines = sLineSelection.selectAll( '.nv-bandline' ).data( [ bandlineData ] );
                bandLines.enter().append( 'g' ).attr( 'class', 'nv-bandline' );
                selectedChart.transition().duration( $attrs.transitionduration === undefined ? 250 : +$attrs.transitionduration ).call( chart );
              } else {
                if ( !d3.select( '#' + $attrs.id + ' svg' ) ) {
                  d3.select( '#' + $attrs.id ).append( 'svg' );
                }
                selectedChart = d3.select( '#' + $attrs.id + ' svg' ).attr( 'height', $scope.height ).attr( 'width', $scope.width ).datum( data );
                //chart.yScale()($scope.bandlineProperties.median)
                sLineSelection = d3.select( 'svg#' + $attrs.id + ' g.nvd3.nv-wrap.nv-sparkline' );
                bandlineData = [
                  $scope.bandlineProperties.min,
                  $scope.bandlineProperties.twentyFithPercentile,
                  $scope.bandlineProperties.median,
                  $scope.bandlineProperties.seventyFithPercentile,
                  $scope.bandlineProperties.max
                ];
                bandLines = sLineSelection.selectAll( '.nv-bandline' ).data( [ bandlineData ] );
                bandLines.enter().append( 'g' ).attr( 'class', 'nv-bandline' );
                selectedChart.transition().duration( $attrs.transitionduration === undefined ? 250 : +$attrs.transitionduration ).call( chart );
              }
            };
          }
        ],
        link: function ( scope, element, attrs ) {
          scope.$watch( 'width + height', function () {
            updateDimensions( scope, attrs, element, scope.chart );
          } );
          scope.$watch( 'data', function ( data ) {
            if ( data && angular.isDefined( scope.filtername ) && angular.isDefined( scope.filtervalue ) ) {
              data = $filter( scope.filtername )( data, scope.filtervalue );
            }
            if ( data ) {
              //if the chart exists on the scope, do not call addGraph again, update data and call the chart.
              if ( scope.chart ) {
                return scope.d3Call( data, scope.chart );
              }
              nv.addGraph( {
                generate: function () {
                  scope.bandlineProperties = {};
                  var sortedValues;
                  initializeMargin( scope, attrs );
                  var chart = nv.models.sparklinePlus().width( scope.width ).height( scope.height ).margin( scope.margin ).x( attrs.x === undefined ? function ( d ) {
                    return d.x;
                  } : scope.x() ).y( attrs.y === undefined ? function ( d ) {
                    return d.y;
                  } : scope.y() ).xTickFormat( attrs.xtickformat === undefined ? d3.format( ',r' ) : scope.xtickformat() ).yTickFormat( attrs.ytickformat === undefined ? d3.format( ',.2f' ) : scope.ytickformat() ).color( attrs.color === undefined ? nv.utils.getColor( [ '#000' ] ) : scope.color() ).showValue( attrs.showvalue === undefined ? true : attrs.showvalue === 'true' ).alignValue( attrs.alignvalue === undefined ? true : attrs.alignvalue === 'true' ).rightAlignValue( attrs.rightalignvalue === undefined ? false : attrs.rightalignvalue === 'true' ).noData( attrs.nodata === undefined ? 'No Data Available.' : scope.nodata );
                  //calc bandline data
                  scope.bandlineProperties.min = d3.min( data, function ( d ) {
                    return d[ 1 ];
                  } );
                  scope.bandlineProperties.max = d3.max( data, function ( d ) {
                    return d[ 1 ];
                  } );
                  sortedValues = data.map( function ( d ) {
                    return d[ 1 ];
                  } ).sort( function ( a, b ) {
                    if ( a[ 0 ] < b[ 0 ] ) {
                      return -1;
                    } else if ( a[ 0 ] === b[ 0 ] ) {
                      return 0;
                    } else {
                      return 1;
                    }
                  } );
                  scope.bandlineProperties.twentyFithPercentile = d3.quantile( sortedValues, 0.25 );
                  scope.bandlineProperties.median = d3.median( sortedValues );
                  scope.bandlineProperties.seventyFithPercentile = d3.quantile( sortedValues, 0.75 );
                  if ( attrs.xScale ) {
                    chart.xScale( scope.xScale() );
                  }
                  if ( attrs.yScale ) {
                    chart.yScale( scope.yScale() );
                  }
                  configureXaxis( chart, scope, attrs );
                  configureYaxis( chart, scope, attrs );
                  processEvents( chart, scope );
                  scope.d3Call( data, chart );
                  nv.utils.windowResize( chart.update );
                  scope.chart = chart;
                  return chart;
                },
                callback: attrs.callback === undefined ? null : scope.callback()
              } );
            }
          }, attrs.objectequality === undefined ? false : attrs.objectequality === 'true' );
        }
      };
    }
  ] ); //still need to implement
  //sparkbars??
  //nv.models.multiBarTimeSeriesChart
  //nv.models.multiChart
  //nv.models.scatterPlusLineChart
  //nv.models.linePlusBarWithFocusChart
  //dual y-axis chart
  //crossfilter using $services?

}() );
