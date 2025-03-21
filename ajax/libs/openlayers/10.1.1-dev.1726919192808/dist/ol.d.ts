export default ol;
declare namespace ol {
    export { $ol$Collection as Collection };
    export { $ol$DataTile as DataTile };
    export { $ol$Disposable as Disposable };
    export { $ol$Feature as Feature };
    export { $ol$Geolocation as Geolocation };
    export { $ol$Image as Image };
    export { $ol$ImageCanvas as ImageCanvas };
    export { $ol$ImageTile as ImageTile };
    export { $ol$Kinetic as Kinetic };
    export { $ol$Map as Map };
    export { $ol$MapBrowserEvent as MapBrowserEvent };
    export { $ol$MapBrowserEventHandler as MapBrowserEventHandler };
    export { $ol$MapEvent as MapEvent };
    export { $ol$Object as Object };
    export { $ol$Observable as Observable };
    export { $ol$Overlay as Overlay };
    export { $ol$Tile as Tile };
    export { $ol$TileCache as TileCache };
    export { $ol$TileQueue as TileQueue };
    export { $ol$TileRange as TileRange };
    export { $ol$VectorRenderTile as VectorRenderTile };
    export { $ol$VectorTile as VectorTile };
    export { $ol$View as View };
    export namespace array {
        export { _ol_array$ascending as ascending };
        export { _ol_array$binarySearch as binarySearch };
        export { _ol_array$descending as descending };
        export { _ol_array$equals as equals };
        export { _ol_array$extend as extend };
        export { _ol_array$isSorted as isSorted };
        export { _ol_array$linearFindNearest as linearFindNearest };
        export { _ol_array$remove as remove };
        export { _ol_array$reverseSubArray as reverseSubArray };
        export { _ol_array$stableSort as stableSort };
    }
    export namespace asserts {
        export { _ol_asserts$assert as assert };
    }
    export namespace centerconstraint {
        export { _ol_centerconstraint$createExtent as createExtent };
        export { _ol_centerconstraint$none as none };
    }
    export namespace color {
        export { _ol_color$NO_COLOR as NO_COLOR };
        export { _ol_color$asArray as asArray };
        export { _ol_color$asString as asString };
        export { _ol_color$fromString as fromString };
        export { _ol_color$isStringColor as isStringColor };
        export { _ol_color$lchaToRgba as lchaToRgba };
        export { _ol_color$normalize as normalize };
        export { _ol_color$rgbaToLcha as rgbaToLcha };
        export { _ol_color$toString as toString };
        export { _ol_color$withAlpha as withAlpha };
    }
    export namespace colorlike {
        export { _ol_colorlike$asColorLike as asColorLike };
    }
    export namespace console {
        export { _ol_console$error as error };
        export { _ol_console$log as log };
        export { _ol_console$setLevel as setLevel };
        export { _ol_console$warn as warn };
    }
    export namespace control {
        export { $ol$control$Attribution as Attribution };
        export { $ol$control$Control as Control };
        export { $ol$control$FullScreen as FullScreen };
        export { $ol$control$MousePosition as MousePosition };
        export { $ol$control$OverviewMap as OverviewMap };
        export { $ol$control$Rotate as Rotate };
        export { $ol$control$ScaleLine as ScaleLine };
        export { $ol$control$Zoom as Zoom };
        export { $ol$control$ZoomSlider as ZoomSlider };
        export { $ol$control$ZoomToExtent as ZoomToExtent };
        export namespace defaults {
            export { _ol_control_defaults$defaults as defaults };
        }
    }
    export namespace coordinate {
        export { _ol_coordinate$add as add };
        export { _ol_coordinate$closestOnCircle as closestOnCircle };
        export { _ol_coordinate$closestOnSegment as closestOnSegment };
        export { _ol_coordinate$createStringXY as createStringXY };
        export { _ol_coordinate$degreesToStringHDMS as degreesToStringHDMS };
        export { _ol_coordinate$distance as distance };
        export { _ol_coordinate$equals as equals };
        export { _ol_coordinate$format as format };
        export { _ol_coordinate$getWorldsAway as getWorldsAway };
        export { _ol_coordinate$rotate as rotate };
        export { _ol_coordinate$scale as scale };
        export { _ol_coordinate$squaredDistance as squaredDistance };
        export { _ol_coordinate$squaredDistanceToSegment as squaredDistanceToSegment };
        export { _ol_coordinate$toStringHDMS as toStringHDMS };
        export { _ol_coordinate$toStringXY as toStringXY };
        export { _ol_coordinate$wrapX as wrapX };
    }
    export namespace css {
        export { _ol_css$CLASS_COLLAPSED as CLASS_COLLAPSED };
        export { _ol_css$CLASS_CONTROL as CLASS_CONTROL };
        export { _ol_css$CLASS_HIDDEN as CLASS_HIDDEN };
        export { _ol_css$CLASS_SELECTABLE as CLASS_SELECTABLE };
        export { _ol_css$CLASS_UNSELECTABLE as CLASS_UNSELECTABLE };
        export { _ol_css$CLASS_UNSUPPORTED as CLASS_UNSUPPORTED };
        export { _ol_css$getFontParameters as getFontParameters };
    }
    export namespace dom {
        export { _ol_dom$createCanvasContext2D as createCanvasContext2D };
        export { _ol_dom$getSharedCanvasContext2D as getSharedCanvasContext2D };
        export { _ol_dom$outerHeight as outerHeight };
        export { _ol_dom$outerWidth as outerWidth };
        export { _ol_dom$releaseCanvas as releaseCanvas };
        export { _ol_dom$removeChildren as removeChildren };
        export { _ol_dom$replaceChildren as replaceChildren };
        export { _ol_dom$replaceNode as replaceNode };
    }
    export namespace easing {
        export { _ol_easing$easeIn as easeIn };
        export { _ol_easing$easeOut as easeOut };
        export { _ol_easing$inAndOut as inAndOut };
        export { _ol_easing$linear as linear };
        export { _ol_easing$upAndDown as upAndDown };
    }
    export namespace events {
        export { $ol$events$Event as Event };
        export namespace SnapEvent {
            export { _ol_events_SnapEvent$SnapEvent as SnapEvent };
        }
        export { $ol$events$Target as Target };
        export namespace condition {
            export { _ol_events_condition$all as all };
            export { _ol_events_condition$altKeyOnly as altKeyOnly };
            export { _ol_events_condition$altShiftKeysOnly as altShiftKeysOnly };
            export { _ol_events_condition$always as always };
            export { _ol_events_condition$click as click };
            export { _ol_events_condition$doubleClick as doubleClick };
            export { _ol_events_condition$focus as focus };
            export { _ol_events_condition$focusWithTabindex as focusWithTabindex };
            export { _ol_events_condition$mouseActionButton as mouseActionButton };
            export { _ol_events_condition$mouseOnly as mouseOnly };
            export { _ol_events_condition$never as never };
            export { _ol_events_condition$noModifierKeys as noModifierKeys };
            export { _ol_events_condition$penOnly as penOnly };
            export { _ol_events_condition$platformModifierKey as platformModifierKey };
            export { _ol_events_condition$platformModifierKeyOnly as platformModifierKeyOnly };
            export { _ol_events_condition$pointerMove as pointerMove };
            export { _ol_events_condition$primaryAction as primaryAction };
            export { _ol_events_condition$shiftKeyOnly as shiftKeyOnly };
            export { _ol_events_condition$singleClick as singleClick };
            export { _ol_events_condition$targetNotEditable as targetNotEditable };
            export { _ol_events_condition$touchOnly as touchOnly };
        }
        export { _ol_events$listen as listen };
        export { _ol_events$listenOnce as listenOnce };
        export { _ol_events$unlistenByKey as unlistenByKey };
    }
    export namespace expr {
        namespace cpu {
            export { _ol_expr_cpu$buildExpression as buildExpression };
            export { _ol_expr_cpu$newEvaluationContext as newEvaluationContext };
        }
        namespace expression {
            export { _ol_expr_expression$AnyType as AnyType };
            export { _ol_expr_expression$BooleanType as BooleanType };
            export { _ol_expr_expression$CallExpression as CallExpression };
            export { _ol_expr_expression$ColorType as ColorType };
            export { _ol_expr_expression$LiteralExpression as LiteralExpression };
            export { _ol_expr_expression$NoneType as NoneType };
            export { _ol_expr_expression$NumberArrayType as NumberArrayType };
            export { _ol_expr_expression$NumberType as NumberType };
            export { _ol_expr_expression$Ops as Ops };
            export { _ol_expr_expression$SizeType as SizeType };
            export { _ol_expr_expression$StringType as StringType };
            export { _ol_expr_expression$computeGeometryType as computeGeometryType };
            export { _ol_expr_expression$includesType as includesType };
            export { _ol_expr_expression$isType as isType };
            export { _ol_expr_expression$newParsingContext as newParsingContext };
            export { _ol_expr_expression$overlapsType as overlapsType };
            export { _ol_expr_expression$parse as parse };
            export { _ol_expr_expression$typeName as typeName };
        }
        namespace gpu {
            export { _ol_expr_gpu$PALETTE_TEXTURE_ARRAY as PALETTE_TEXTURE_ARRAY };
            export { _ol_expr_gpu$arrayToGlsl as arrayToGlsl };
            export { _ol_expr_gpu$buildExpression as buildExpression };
            export { _ol_expr_gpu$colorToGlsl as colorToGlsl };
            export { _ol_expr_gpu$getStringNumberEquivalent as getStringNumberEquivalent };
            export { _ol_expr_gpu$newCompilationContext as newCompilationContext };
            export { _ol_expr_gpu$numberToGlsl as numberToGlsl };
            export { _ol_expr_gpu$sizeToGlsl as sizeToGlsl };
            export { _ol_expr_gpu$stringToGlsl as stringToGlsl };
            export { _ol_expr_gpu$uniformNameForVariable as uniformNameForVariable };
        }
    }
    export namespace extent {
        export { _ol_extent$applyTransform as applyTransform };
        export { _ol_extent$approximatelyEquals as approximatelyEquals };
        export { _ol_extent$boundingExtent as boundingExtent };
        export { _ol_extent$buffer as buffer };
        export { _ol_extent$clone as clone };
        export { _ol_extent$closestSquaredDistanceXY as closestSquaredDistanceXY };
        export { _ol_extent$containsCoordinate as containsCoordinate };
        export { _ol_extent$containsExtent as containsExtent };
        export { _ol_extent$containsXY as containsXY };
        export { _ol_extent$coordinateRelationship as coordinateRelationship };
        export { _ol_extent$createEmpty as createEmpty };
        export { _ol_extent$createOrUpdate as createOrUpdate };
        export { _ol_extent$createOrUpdateEmpty as createOrUpdateEmpty };
        export { _ol_extent$createOrUpdateFromCoordinate as createOrUpdateFromCoordinate };
        export { _ol_extent$createOrUpdateFromCoordinates as createOrUpdateFromCoordinates };
        export { _ol_extent$createOrUpdateFromFlatCoordinates as createOrUpdateFromFlatCoordinates };
        export { _ol_extent$createOrUpdateFromRings as createOrUpdateFromRings };
        export { _ol_extent$equals as equals };
        export { _ol_extent$extend as extend };
        export { _ol_extent$extendCoordinate as extendCoordinate };
        export { _ol_extent$extendCoordinates as extendCoordinates };
        export { _ol_extent$extendFlatCoordinates as extendFlatCoordinates };
        export { _ol_extent$extendRings as extendRings };
        export { _ol_extent$extendXY as extendXY };
        export { _ol_extent$forEachCorner as forEachCorner };
        export { _ol_extent$getArea as getArea };
        export { _ol_extent$getBottomLeft as getBottomLeft };
        export { _ol_extent$getBottomRight as getBottomRight };
        export { _ol_extent$getCenter as getCenter };
        export { _ol_extent$getCorner as getCorner };
        export { _ol_extent$getEnlargedArea as getEnlargedArea };
        export { _ol_extent$getForViewAndSize as getForViewAndSize };
        export { _ol_extent$getHeight as getHeight };
        export { _ol_extent$getIntersection as getIntersection };
        export { _ol_extent$getIntersectionArea as getIntersectionArea };
        export { _ol_extent$getMargin as getMargin };
        export { _ol_extent$getRotatedViewport as getRotatedViewport };
        export { _ol_extent$getSize as getSize };
        export { _ol_extent$getTopLeft as getTopLeft };
        export { _ol_extent$getTopRight as getTopRight };
        export { _ol_extent$getWidth as getWidth };
        export { _ol_extent$intersects as intersects };
        export { _ol_extent$intersectsSegment as intersectsSegment };
        export { _ol_extent$isEmpty as isEmpty };
        export { _ol_extent$returnOrUpdate as returnOrUpdate };
        export { _ol_extent$scaleFromCenter as scaleFromCenter };
        export { _ol_extent$wrapAndSliceX as wrapAndSliceX };
        export { _ol_extent$wrapX as wrapX };
    }
    export namespace featureloader {
        export { _ol_featureloader$loadFeaturesXhr as loadFeaturesXhr };
        export { _ol_featureloader$setWithCredentials as setWithCredentials };
        export { _ol_featureloader$xhr as xhr };
    }
    export namespace format {
        export { $ol$format$EsriJSON as EsriJSON };
        export { $ol$format$Feature as Feature };
        export { $ol$format$GML as GML };
        export { $ol$format$GML2 as GML2 };
        export { $ol$format$GML3 as GML3 };
        export { $ol$format$GML32 as GML32 };
        export { $ol$format$GMLBase as GMLBase };
        export { $ol$format$GPX as GPX };
        export { $ol$format$GeoJSON as GeoJSON };
        export { $ol$format$IGC as IGC };
        export { $ol$format$IIIFInfo as IIIFInfo };
        export { $ol$format$JSONFeature as JSONFeature };
        export { $ol$format$KML as KML };
        export { $ol$format$MVT as MVT };
        export { $ol$format$OSMXML as OSMXML };
        export { $ol$format$OWS as OWS };
        export { $ol$format$Polyline as Polyline };
        export { $ol$format$TextFeature as TextFeature };
        export { $ol$format$TopoJSON as TopoJSON };
        export { $ol$format$WFS as WFS };
        export { $ol$format$WKB as WKB };
        export { $ol$format$WKT as WKT };
        export { $ol$format$WMSCapabilities as WMSCapabilities };
        export { $ol$format$WMSGetFeatureInfo as WMSGetFeatureInfo };
        export { $ol$format$WMTSCapabilities as WMTSCapabilities };
        export { $ol$format$XML as XML };
        export { $ol$format$XMLFeature as XMLFeature };
        export namespace filter {
            export { $ol$format$filter$And as And };
            export { $ol$format$filter$Bbox as Bbox };
            export { $ol$format$filter$Comparison as Comparison };
            export { $ol$format$filter$ComparisonBinary as ComparisonBinary };
            export { $ol$format$filter$Contains as Contains };
            export { $ol$format$filter$DWithin as DWithin };
            export { $ol$format$filter$Disjoint as Disjoint };
            export { $ol$format$filter$During as During };
            export { $ol$format$filter$EqualTo as EqualTo };
            export { $ol$format$filter$Filter as Filter };
            export { $ol$format$filter$GreaterThan as GreaterThan };
            export { $ol$format$filter$GreaterThanOrEqualTo as GreaterThanOrEqualTo };
            export { $ol$format$filter$Intersects as Intersects };
            export { $ol$format$filter$IsBetween as IsBetween };
            export { $ol$format$filter$IsLike as IsLike };
            export { $ol$format$filter$IsNull as IsNull };
            export { $ol$format$filter$LessThan as LessThan };
            export { $ol$format$filter$LessThanOrEqualTo as LessThanOrEqualTo };
            export { $ol$format$filter$LogicalNary as LogicalNary };
            export { $ol$format$filter$Not as Not };
            export { $ol$format$filter$NotEqualTo as NotEqualTo };
            export { $ol$format$filter$Or as Or };
            export { $ol$format$filter$ResourceId as ResourceId };
            export { $ol$format$filter$Spatial as Spatial };
            export { $ol$format$filter$Within as Within };
            export { _ol_format_filter$and as and };
            export { _ol_format_filter$bbox as bbox };
            export { _ol_format_filter$between as between };
            export { _ol_format_filter$contains as contains };
            export { _ol_format_filter$disjoint as disjoint };
            export { _ol_format_filter$during as during };
            export { _ol_format_filter$dwithin as dwithin };
            export { _ol_format_filter$equalTo as equalTo };
            export { _ol_format_filter$greaterThan as greaterThan };
            export { _ol_format_filter$greaterThanOrEqualTo as greaterThanOrEqualTo };
            export { _ol_format_filter$intersects as intersects };
            export { _ol_format_filter$isNull as isNull };
            export { _ol_format_filter$lessThan as lessThan };
            export { _ol_format_filter$lessThanOrEqualTo as lessThanOrEqualTo };
            export { _ol_format_filter$like as like };
            export { _ol_format_filter$not as not };
            export { _ol_format_filter$notEqualTo as notEqualTo };
            export { _ol_format_filter$or as or };
            export { _ol_format_filter$resourceId as resourceId };
            export { _ol_format_filter$within as within };
        }
        export namespace xlink {
            export { _ol_format_xlink$readHref as readHref };
        }
        export namespace xsd {
            export { _ol_format_xsd$readBoolean as readBoolean };
            export { _ol_format_xsd$readBooleanString as readBooleanString };
            export { _ol_format_xsd$readDateTime as readDateTime };
            export { _ol_format_xsd$readDecimal as readDecimal };
            export { _ol_format_xsd$readDecimalString as readDecimalString };
            export { _ol_format_xsd$readNonNegativeIntegerString as readNonNegativeIntegerString };
            export { _ol_format_xsd$readPositiveInteger as readPositiveInteger };
            export { _ol_format_xsd$readString as readString };
            export { _ol_format_xsd$writeBooleanTextNode as writeBooleanTextNode };
            export { _ol_format_xsd$writeCDATASection as writeCDATASection };
            export { _ol_format_xsd$writeDateTimeTextNode as writeDateTimeTextNode };
            export { _ol_format_xsd$writeDecimalTextNode as writeDecimalTextNode };
            export { _ol_format_xsd$writeNonNegativeIntegerTextNode as writeNonNegativeIntegerTextNode };
            export { _ol_format_xsd$writeStringTextNode as writeStringTextNode };
        }
    }
    export namespace functions {
        export { _ol_functions$FALSE as FALSE };
        export { _ol_functions$TRUE as TRUE };
        export { _ol_functions$VOID as VOID };
        export { _ol_functions$memoizeOne as memoizeOne };
        export { _ol_functions$toPromise as toPromise };
    }
    export namespace geom {
        export { $ol$geom$Circle as Circle };
        export { $ol$geom$Geometry as Geometry };
        export { $ol$geom$GeometryCollection as GeometryCollection };
        export { $ol$geom$LineString as LineString };
        export { $ol$geom$LinearRing as LinearRing };
        export { $ol$geom$MultiLineString as MultiLineString };
        export { $ol$geom$MultiPoint as MultiPoint };
        export { $ol$geom$MultiPolygon as MultiPolygon };
        export { $ol$geom$Point as Point };
        export { $ol$geom$Polygon as Polygon };
        export { $ol$geom$SimpleGeometry as SimpleGeometry };
        export namespace flat {
            namespace area {
                export { _ol_geom_flat_area$linearRing as linearRing };
                export { _ol_geom_flat_area$linearRings as linearRings };
                export { _ol_geom_flat_area$linearRingss as linearRingss };
            }
            namespace center {
                export { _ol_geom_flat_center$linearRingss as linearRingss };
            }
            namespace closest {
                export { _ol_geom_flat_closest$arrayMaxSquaredDelta as arrayMaxSquaredDelta };
                export { _ol_geom_flat_closest$assignClosestArrayPoint as assignClosestArrayPoint };
                export { _ol_geom_flat_closest$assignClosestMultiArrayPoint as assignClosestMultiArrayPoint };
                export { _ol_geom_flat_closest$assignClosestPoint as assignClosestPoint };
                export { _ol_geom_flat_closest$maxSquaredDelta as maxSquaredDelta };
                export { _ol_geom_flat_closest$multiArrayMaxSquaredDelta as multiArrayMaxSquaredDelta };
            }
            namespace contains {
                export { _ol_geom_flat_contains$linearRingContainsExtent as linearRingContainsExtent };
                export { _ol_geom_flat_contains$linearRingContainsXY as linearRingContainsXY };
                export { _ol_geom_flat_contains$linearRingsContainsXY as linearRingsContainsXY };
                export { _ol_geom_flat_contains$linearRingssContainsXY as linearRingssContainsXY };
            }
            namespace deflate {
                export { _ol_geom_flat_deflate$deflateCoordinate as deflateCoordinate };
                export { _ol_geom_flat_deflate$deflateCoordinates as deflateCoordinates };
                export { _ol_geom_flat_deflate$deflateCoordinatesArray as deflateCoordinatesArray };
                export { _ol_geom_flat_deflate$deflateMultiCoordinatesArray as deflateMultiCoordinatesArray };
            }
            namespace flip {
                export { _ol_geom_flat_flip$flipXY as flipXY };
            }
            namespace geodesic {
                export { _ol_geom_flat_geodesic$greatCircleArc as greatCircleArc };
                export { _ol_geom_flat_geodesic$meridian as meridian };
                export { _ol_geom_flat_geodesic$parallel as parallel };
            }
            namespace inflate {
                export { _ol_geom_flat_inflate$inflateCoordinates as inflateCoordinates };
                export { _ol_geom_flat_inflate$inflateCoordinatesArray as inflateCoordinatesArray };
                export { _ol_geom_flat_inflate$inflateMultiCoordinatesArray as inflateMultiCoordinatesArray };
            }
            namespace interiorpoint {
                export { _ol_geom_flat_interiorpoint$getInteriorPointOfArray as getInteriorPointOfArray };
                export { _ol_geom_flat_interiorpoint$getInteriorPointsOfMultiArray as getInteriorPointsOfMultiArray };
            }
            namespace interpolate {
                export { _ol_geom_flat_interpolate$interpolatePoint as interpolatePoint };
                export { _ol_geom_flat_interpolate$lineStringCoordinateAtM as lineStringCoordinateAtM };
                export { _ol_geom_flat_interpolate$lineStringsCoordinateAtM as lineStringsCoordinateAtM };
            }
            namespace intersectsextent {
                export { _ol_geom_flat_intersectsextent$intersectsLineString as intersectsLineString };
                export { _ol_geom_flat_intersectsextent$intersectsLineStringArray as intersectsLineStringArray };
                export { _ol_geom_flat_intersectsextent$intersectsLinearRing as intersectsLinearRing };
                export { _ol_geom_flat_intersectsextent$intersectsLinearRingArray as intersectsLinearRingArray };
                export { _ol_geom_flat_intersectsextent$intersectsLinearRingMultiArray as intersectsLinearRingMultiArray };
            }
            namespace length {
                export { _ol_geom_flat_length$lineStringLength as lineStringLength };
                export { _ol_geom_flat_length$linearRingLength as linearRingLength };
            }
            namespace orient {
                export { _ol_geom_flat_orient$inflateEnds as inflateEnds };
                export { _ol_geom_flat_orient$linearRingIsClockwise as linearRingIsClockwise };
                export { _ol_geom_flat_orient$linearRingsAreOriented as linearRingsAreOriented };
                export { _ol_geom_flat_orient$linearRingssAreOriented as linearRingssAreOriented };
                export { _ol_geom_flat_orient$orientLinearRings as orientLinearRings };
                export { _ol_geom_flat_orient$orientLinearRingsArray as orientLinearRingsArray };
            }
            namespace reverse {
                export { _ol_geom_flat_reverse$coordinates as coordinates };
            }
            namespace segments {
                export { _ol_geom_flat_segments$forEach as forEach };
            }
            namespace simplify {
                export { _ol_geom_flat_simplify$douglasPeucker as douglasPeucker };
                export { _ol_geom_flat_simplify$douglasPeuckerArray as douglasPeuckerArray };
                export { _ol_geom_flat_simplify$douglasPeuckerMultiArray as douglasPeuckerMultiArray };
                export { _ol_geom_flat_simplify$quantize as quantize };
                export { _ol_geom_flat_simplify$quantizeArray as quantizeArray };
                export { _ol_geom_flat_simplify$quantizeMultiArray as quantizeMultiArray };
                export { _ol_geom_flat_simplify$radialDistance as radialDistance };
                export { _ol_geom_flat_simplify$simplifyLineString as simplifyLineString };
                export { _ol_geom_flat_simplify$snap as snap };
            }
            namespace straightchunk {
                export { _ol_geom_flat_straightchunk$matchingChunk as matchingChunk };
            }
            namespace textpath {
                export { _ol_geom_flat_textpath$drawTextOnPath as drawTextOnPath };
            }
            namespace topology {
                export { _ol_geom_flat_topology$lineStringIsClosed as lineStringIsClosed };
            }
            namespace transform {
                export { _ol_geom_flat_transform$rotate as rotate };
                export { _ol_geom_flat_transform$scale as scale };
                export { _ol_geom_flat_transform$transform2D as transform2D };
                export { _ol_geom_flat_transform$translate as translate };
            }
        }
    }
    export namespace has {
        export { _ol_has$CREATE_IMAGE_BITMAP as CREATE_IMAGE_BITMAP };
        export { _ol_has$DEVICE_PIXEL_RATIO as DEVICE_PIXEL_RATIO };
        export { _ol_has$FIREFOX as FIREFOX };
        export { _ol_has$IMAGE_DECODE as IMAGE_DECODE };
        export { _ol_has$MAC as MAC };
        export { _ol_has$PASSIVE_EVENT_LISTENERS as PASSIVE_EVENT_LISTENERS };
        export { _ol_has$SAFARI as SAFARI };
        export { _ol_has$SAFARI_BUG_237906 as SAFARI_BUG_237906 };
        export { _ol_has$WEBKIT as WEBKIT };
        export { _ol_has$WORKER_OFFSCREEN_CANVAS as WORKER_OFFSCREEN_CANVAS };
    }
    export namespace interaction {
        export { $ol$interaction$DblClickDragZoom as DblClickDragZoom };
        export { $ol$interaction$DoubleClickZoom as DoubleClickZoom };
        export { $ol$interaction$DragAndDrop as DragAndDrop };
        export { $ol$interaction$DragBox as DragBox };
        export { $ol$interaction$DragPan as DragPan };
        export { $ol$interaction$DragRotate as DragRotate };
        export { $ol$interaction$DragRotateAndZoom as DragRotateAndZoom };
        export { $ol$interaction$DragZoom as DragZoom };
        export { $ol$interaction$Draw as Draw };
        export { $ol$interaction$Extent as Extent };
        export { $ol$interaction$Interaction as Interaction };
        export { $ol$interaction$KeyboardPan as KeyboardPan };
        export { $ol$interaction$KeyboardZoom as KeyboardZoom };
        export { $ol$interaction$Link as Link };
        export { $ol$interaction$Modify as Modify };
        export { $ol$interaction$MouseWheelZoom as MouseWheelZoom };
        export { $ol$interaction$PinchRotate as PinchRotate };
        export { $ol$interaction$PinchZoom as PinchZoom };
        export { $ol$interaction$Pointer as Pointer };
        export { $ol$interaction$Select as Select };
        export { $ol$interaction$Snap as Snap };
        export { $ol$interaction$Translate as Translate };
        export namespace defaults {
            export { _ol_interaction_defaults$defaults as defaults };
        }
    }
    export namespace layer {
        export { $ol$layer$Base as Base };
        export { $ol$layer$BaseImage as BaseImage };
        export { $ol$layer$BaseTile as BaseTile };
        export { $ol$layer$BaseVector as BaseVector };
        export { $ol$layer$Flow as Flow };
        export { $ol$layer$Graticule as Graticule };
        export { $ol$layer$Group as Group };
        export { $ol$layer$Heatmap as Heatmap };
        export { $ol$layer$Image as Image };
        export { $ol$layer$Layer as Layer };
        export { $ol$layer$Tile as Tile };
        export { $ol$layer$Vector as Vector };
        export { $ol$layer$VectorImage as VectorImage };
        export { $ol$layer$VectorTile as VectorTile };
        export { $ol$layer$WebGLPoints as WebGLPoints };
        export { $ol$layer$WebGLTile as WebGLTile };
    }
    export namespace loadingstrategy {
        export { _ol_loadingstrategy$all as all };
        export { _ol_loadingstrategy$bbox as bbox };
        export { _ol_loadingstrategy$tile as tile };
    }
    export namespace math {
        export { _ol_math$ceil as ceil };
        export { _ol_math$clamp as clamp };
        export { _ol_math$floor as floor };
        export { _ol_math$lerp as lerp };
        export { _ol_math$modulo as modulo };
        export { _ol_math$round as round };
        export { _ol_math$solveLinearSystem as solveLinearSystem };
        export { _ol_math$squaredDistance as squaredDistance };
        export { _ol_math$squaredSegmentDistance as squaredSegmentDistance };
        export { _ol_math$toDegrees as toDegrees };
        export { _ol_math$toFixed as toFixed };
        export { _ol_math$toRadians as toRadians };
    }
    export namespace net {
        export { _ol_net$ClientError as ClientError };
        export { _ol_net$ResponseError as ResponseError };
        export { _ol_net$getJSON as getJSON };
        export { _ol_net$jsonp as jsonp };
        export { _ol_net$overrideXHR as overrideXHR };
        export { _ol_net$resolveUrl as resolveUrl };
        export { _ol_net$restoreXHR as restoreXHR };
    }
    export namespace obj {
        export { _ol_obj$clear as clear };
        export { _ol_obj$isEmpty as isEmpty };
    }
    export namespace proj {
        export { $ol$proj$Projection as Projection };
        export namespace Units {
            export { _ol_proj_Units$METERS_PER_UNIT as METERS_PER_UNIT };
            export { _ol_proj_Units$fromCode as fromCode };
        }
        export { _ol_proj$addCommon as addCommon };
        export { _ol_proj$addCoordinateTransforms as addCoordinateTransforms };
        export { _ol_proj$addEquivalentProjections as addEquivalentProjections };
        export { _ol_proj$addEquivalentTransforms as addEquivalentTransforms };
        export { _ol_proj$addProjection as addProjection };
        export { _ol_proj$addProjections as addProjections };
        export { _ol_proj$clearAllProjections as clearAllProjections };
        export { _ol_proj$clearUserProjection as clearUserProjection };
        export { _ol_proj$cloneTransform as cloneTransform };
        export { _ol_proj$createProjection as createProjection };
        export { _ol_proj$createSafeCoordinateTransform as createSafeCoordinateTransform };
        export { _ol_proj$createTransformFromCoordinateTransform as createTransformFromCoordinateTransform };
        export { _ol_proj$disableCoordinateWarning as disableCoordinateWarning };
        export namespace epsg3857 {
            export { _ol_proj_epsg3857$EXTENT as EXTENT };
            export { _ol_proj_epsg3857$HALF_SIZE as HALF_SIZE };
            export { _ol_proj_epsg3857$MAX_SAFE_Y as MAX_SAFE_Y };
            export { _ol_proj_epsg3857$PROJECTIONS as PROJECTIONS };
            export { _ol_proj_epsg3857$RADIUS as RADIUS };
            export { _ol_proj_epsg3857$WORLD_EXTENT as WORLD_EXTENT };
            export { _ol_proj_epsg3857$fromEPSG4326 as fromEPSG4326 };
            export { _ol_proj_epsg3857$toEPSG4326 as toEPSG4326 };
        }
        export namespace epsg4326 {
            export { _ol_proj_epsg4326$EXTENT as EXTENT };
            export { _ol_proj_epsg4326$METERS_PER_UNIT as METERS_PER_UNIT };
            export { _ol_proj_epsg4326$PROJECTIONS as PROJECTIONS };
            export { _ol_proj_epsg4326$RADIUS as RADIUS };
        }
        export { _ol_proj$equivalent as equivalent };
        export { _ol_proj$fromLonLat as fromLonLat };
        export { _ol_proj$fromUserCoordinate as fromUserCoordinate };
        export { _ol_proj$fromUserExtent as fromUserExtent };
        export { _ol_proj$fromUserResolution as fromUserResolution };
        export { _ol_proj$get as get };
        export { _ol_proj$getPointResolution as getPointResolution };
        export { _ol_proj$getTransform as getTransform };
        export { _ol_proj$getTransformFromProjections as getTransformFromProjections };
        export { _ol_proj$getUserProjection as getUserProjection };
        export { _ol_proj$identityTransform as identityTransform };
        export namespace proj4 {
            export { _ol_proj_proj4$epsgLookupMapTiler as epsgLookupMapTiler };
            export { _ol_proj_proj4$fromEPSGCode as fromEPSGCode };
            export { _ol_proj_proj4$getEPSGLookup as getEPSGLookup };
            export { _ol_proj_proj4$isRegistered as isRegistered };
            export { _ol_proj_proj4$register as register };
            export { _ol_proj_proj4$setEPSGLookup as setEPSGLookup };
            export { _ol_proj_proj4$unregister as unregister };
        }
        export namespace projections {
            export { _ol_proj_projections$add as add };
            export { _ol_proj_projections$clear as clear };
            export { _ol_proj_projections$get as get };
        }
        export { _ol_proj$setUserProjection as setUserProjection };
        export { _ol_proj$toLonLat as toLonLat };
        export { _ol_proj$toUserCoordinate as toUserCoordinate };
        export { _ol_proj$toUserExtent as toUserExtent };
        export { _ol_proj$toUserResolution as toUserResolution };
        export { _ol_proj$transform as transform };
        export { _ol_proj$transformExtent as transformExtent };
        export { _ol_proj$transformWithProjections as transformWithProjections };
        export namespace transforms {
            export { _ol_proj_transforms$add as add };
            export { _ol_proj_transforms$clear as clear };
            export { _ol_proj_transforms$get as get };
            export { _ol_proj_transforms$remove as remove };
        }
        export { _ol_proj$useGeographic as useGeographic };
    }
    export namespace render {
        export { $ol$render$Box as Box };
        export { $ol$render$Event as Event };
        export { $ol$render$Feature as Feature };
        export { $ol$render$VectorContext as VectorContext };
        export namespace canvas {
            export { $ol$render$canvas$Builder as Builder };
            export { $ol$render$canvas$BuilderGroup as BuilderGroup };
            export { $ol$render$canvas$Executor as Executor };
            export { $ol$render$canvas$ExecutorGroup as ExecutorGroup };
            export { $ol$render$canvas$ImageBuilder as ImageBuilder };
            export { $ol$render$canvas$Immediate as Immediate };
            export namespace Instruction {
                export { _ol_render_canvas_Instruction$beginPathInstruction as beginPathInstruction };
                export { _ol_render_canvas_Instruction$closePathInstruction as closePathInstruction };
                export { _ol_render_canvas_Instruction$fillInstruction as fillInstruction };
                export { _ol_render_canvas_Instruction$strokeInstruction as strokeInstruction };
            }
            export { $ol$render$canvas$LineStringBuilder as LineStringBuilder };
            export { $ol$render$canvas$PolygonBuilder as PolygonBuilder };
            export { $ol$render$canvas$TextBuilder as TextBuilder };
            export { $ol$render$canvas$ZIndexContext as ZIndexContext };
            export { _ol_render_canvas$checkedFonts as checkedFonts };
            export { _ol_render_canvas$defaultFillStyle as defaultFillStyle };
            export { _ol_render_canvas$defaultFont as defaultFont };
            export { _ol_render_canvas$defaultLineCap as defaultLineCap };
            export { _ol_render_canvas$defaultLineDash as defaultLineDash };
            export { _ol_render_canvas$defaultLineDashOffset as defaultLineDashOffset };
            export { _ol_render_canvas$defaultLineJoin as defaultLineJoin };
            export { _ol_render_canvas$defaultLineWidth as defaultLineWidth };
            export { _ol_render_canvas$defaultMiterLimit as defaultMiterLimit };
            export { _ol_render_canvas$defaultPadding as defaultPadding };
            export { _ol_render_canvas$defaultStrokeStyle as defaultStrokeStyle };
            export { _ol_render_canvas$defaultTextAlign as defaultTextAlign };
            export { _ol_render_canvas$defaultTextBaseline as defaultTextBaseline };
            export { _ol_render_canvas$drawImageOrLabel as drawImageOrLabel };
            export { _ol_render_canvas$getTextDimensions as getTextDimensions };
            export namespace hitdetect {
                export { _ol_render_canvas_hitdetect$HIT_DETECT_RESOLUTION as HIT_DETECT_RESOLUTION };
                export { _ol_render_canvas_hitdetect$createHitDetectionImageData as createHitDetectionImageData };
                export { _ol_render_canvas_hitdetect$hitDetect as hitDetect };
            }
            export { _ol_render_canvas$measureAndCacheTextWidth as measureAndCacheTextWidth };
            export { _ol_render_canvas$measureTextHeight as measureTextHeight };
            export { _ol_render_canvas$measureTextWidth as measureTextWidth };
            export { _ol_render_canvas$registerFont as registerFont };
            export { _ol_render_canvas$rotateAtOffset as rotateAtOffset };
            export namespace style {
                export { _ol_render_canvas_style$buildRuleSet as buildRuleSet };
                export { _ol_render_canvas_style$buildStyle as buildStyle };
                export { _ol_render_canvas_style$flatStylesToStyleFunction as flatStylesToStyleFunction };
                export { _ol_render_canvas_style$rulesToStyleFunction as rulesToStyleFunction };
            }
            export { _ol_render_canvas$textHeights as textHeights };
        }
        export { _ol_render$getRenderPixel as getRenderPixel };
        export { _ol_render$getVectorContext as getVectorContext };
        export { _ol_render$toContext as toContext };
        export namespace webgl {
            export { $ol$render$webgl$MixedGeometryBatch as MixedGeometryBatch };
            export { $ol$render$webgl$VectorStyleRenderer as VectorStyleRenderer };
            export namespace renderinstructions {
                export { _ol_render_webgl_renderinstructions$generateLineStringRenderInstructions as generateLineStringRenderInstructions };
                export { _ol_render_webgl_renderinstructions$generatePointRenderInstructions as generatePointRenderInstructions };
                export { _ol_render_webgl_renderinstructions$generatePolygonRenderInstructions as generatePolygonRenderInstructions };
                export { _ol_render_webgl_renderinstructions$getCustomAttributesSize as getCustomAttributesSize };
            }
            export namespace utils {
                export { _ol_render_webgl_utils$LINESTRING_ANGLE_COSINE_CUTOFF as LINESTRING_ANGLE_COSINE_CUTOFF };
                export { _ol_render_webgl_utils$colorDecodeId as colorDecodeId };
                export { _ol_render_webgl_utils$colorEncodeId as colorEncodeId };
                export { _ol_render_webgl_utils$getBlankImageData as getBlankImageData };
                export { _ol_render_webgl_utils$writeLineSegmentToBuffers as writeLineSegmentToBuffers };
                export { _ol_render_webgl_utils$writePointFeatureToBuffers as writePointFeatureToBuffers };
                export { _ol_render_webgl_utils$writePolygonTrianglesToBuffers as writePolygonTrianglesToBuffers };
            }
        }
    }
    export namespace renderer {
        export { $ol$renderer$Composite as Composite };
        export { $ol$renderer$Layer as Layer };
        export { $ol$renderer$Map as Map };
        export namespace canvas {
            export { $ol$renderer$canvas$ImageLayer as ImageLayer };
            export { $ol$renderer$canvas$Layer as Layer };
            export { $ol$renderer$canvas$TileLayer as TileLayer };
            export { $ol$renderer$canvas$VectorImageLayer as VectorImageLayer };
            export { $ol$renderer$canvas$VectorLayer as VectorLayer };
            export { $ol$renderer$canvas$VectorTileLayer as VectorTileLayer };
        }
        export namespace vector {
            export { _ol_renderer_vector$defaultOrder as defaultOrder };
            export { _ol_renderer_vector$getSquaredTolerance as getSquaredTolerance };
            export { _ol_renderer_vector$getTolerance as getTolerance };
            export { _ol_renderer_vector$renderFeature as renderFeature };
        }
        export namespace webgl {
            export { $ol$renderer$webgl$FlowLayer as FlowLayer };
            export { $ol$renderer$webgl$Layer as Layer };
            export { $ol$renderer$webgl$PointsLayer as PointsLayer };
            export { $ol$renderer$webgl$TileLayer as TileLayer };
            export { $ol$renderer$webgl$TileLayerBase as TileLayerBase };
            export { $ol$renderer$webgl$VectorLayer as VectorLayer };
            export { $ol$renderer$webgl$VectorTileLayer as VectorTileLayer };
        }
    }
    export namespace reproj {
        export { $ol$reproj$DataTile as DataTile };
        export { $ol$reproj$Image as Image };
        export { $ol$reproj$Tile as Tile };
        export { $ol$reproj$Triangulation as Triangulation };
        export { _ol_reproj$calculateSourceExtentResolution as calculateSourceExtentResolution };
        export { _ol_reproj$calculateSourceResolution as calculateSourceResolution };
        export { _ol_reproj$canvasPool as canvasPool };
        export namespace common {
            export { _ol_reproj_common$ERROR_THRESHOLD as ERROR_THRESHOLD };
        }
        export { _ol_reproj$render as render };
    }
    export namespace resolution {
        export { _ol_resolution$fromResolutionLike as fromResolutionLike };
    }
    export namespace resolutionconstraint {
        export { _ol_resolutionconstraint$createMinMaxResolution as createMinMaxResolution };
        export { _ol_resolutionconstraint$createSnapToPower as createSnapToPower };
        export { _ol_resolutionconstraint$createSnapToResolutions as createSnapToResolutions };
    }
    export namespace rotationconstraint {
        export { _ol_rotationconstraint$createSnapToN as createSnapToN };
        export { _ol_rotationconstraint$createSnapToZero as createSnapToZero };
        export { _ol_rotationconstraint$disable as disable };
        export { _ol_rotationconstraint$none as none };
    }
    export namespace size {
        export { _ol_size$buffer as buffer };
        export { _ol_size$hasArea as hasArea };
        export { _ol_size$scale as scale };
        export { _ol_size$toSize as toSize };
    }
    export namespace source {
        export { $ol$source$BingMaps as BingMaps };
        export { $ol$source$CartoDB as CartoDB };
        export { $ol$source$Cluster as Cluster };
        export { $ol$source$DataTile as DataTile };
        export { $ol$source$GeoTIFF as GeoTIFF };
        export { $ol$source$Google as Google };
        export { $ol$source$IIIF as IIIF };
        export { $ol$source$Image as Image };
        export { $ol$source$ImageArcGISRest as ImageArcGISRest };
        export { $ol$source$ImageCanvas as ImageCanvas };
        export { $ol$source$ImageMapGuide as ImageMapGuide };
        export { $ol$source$ImageStatic as ImageStatic };
        export { $ol$source$ImageTile as ImageTile };
        export { $ol$source$ImageWMS as ImageWMS };
        export { $ol$source$OGCMapTile as OGCMapTile };
        export { $ol$source$OGCVectorTile as OGCVectorTile };
        export { $ol$source$OSM as OSM };
        export { $ol$source$Raster as Raster };
        export { $ol$source$Source as Source };
        export { $ol$source$StadiaMaps as StadiaMaps };
        export { $ol$source$Tile as Tile };
        export { $ol$source$TileArcGISRest as TileArcGISRest };
        export { $ol$source$TileDebug as TileDebug };
        export { $ol$source$TileImage as TileImage };
        export { $ol$source$TileJSON as TileJSON };
        export { $ol$source$TileWMS as TileWMS };
        export { $ol$source$UTFGrid as UTFGrid };
        export { $ol$source$UrlTile as UrlTile };
        export { $ol$source$Vector as Vector };
        export { $ol$source$VectorTile as VectorTile };
        export { $ol$source$WMTS as WMTS };
        export { $ol$source$XYZ as XYZ };
        export { $ol$source$Zoomify as Zoomify };
        export namespace arcgisRest {
            export { _ol_source_arcgisRest$createLoader as createLoader };
            export { _ol_source_arcgisRest$getRequestUrl as getRequestUrl };
        }
        export namespace common {
            export { _ol_source_common$DECIMALS as DECIMALS };
            export { _ol_source_common$DEFAULT_WMS_VERSION as DEFAULT_WMS_VERSION };
        }
        export namespace mapguide {
            export { _ol_source_mapguide$createLoader as createLoader };
        }
        export namespace ogcTileUtil {
            export { _ol_source_ogcTileUtil$appendCollectionsQueryParam as appendCollectionsQueryParam };
            export { _ol_source_ogcTileUtil$getMapTileUrlTemplate as getMapTileUrlTemplate };
            export { _ol_source_ogcTileUtil$getTileSetInfo as getTileSetInfo };
            export { _ol_source_ogcTileUtil$getVectorTileUrlTemplate as getVectorTileUrlTemplate };
        }
        export { _ol_source$sourcesFromTileGrid as sourcesFromTileGrid };
        namespace _static {
            export { _ol_source_static$createLoader as createLoader };
        }
        export { _static as static };
        export namespace wms {
            export { _ol_source_wms$DEFAULT_VERSION as DEFAULT_VERSION };
            export { _ol_source_wms$createLoader as createLoader };
            export { _ol_source_wms$getFeatureInfoUrl as getFeatureInfoUrl };
            export { _ol_source_wms$getImageSrc as getImageSrc };
            export { _ol_source_wms$getLegendUrl as getLegendUrl };
            export { _ol_source_wms$getRequestParams as getRequestParams };
            export { _ol_source_wms$getRequestUrl as getRequestUrl };
        }
    }
    export namespace sphere {
        export { _ol_sphere$DEFAULT_RADIUS as DEFAULT_RADIUS };
        export { _ol_sphere$getArea as getArea };
        export { _ol_sphere$getDistance as getDistance };
        export { _ol_sphere$getLength as getLength };
        export { _ol_sphere$offset as offset };
    }
    export namespace string {
        export { _ol_string$compareVersions as compareVersions };
        export { _ol_string$padNumber as padNumber };
    }
    export namespace structs {
        export { $ol$structs$LRUCache as LRUCache };
        export { $ol$structs$PriorityQueue as PriorityQueue };
        export { $ol$structs$RBush as RBush };
    }
    export namespace style {
        export { $ol$style$Circle as Circle };
        export { $ol$style$Fill as Fill };
        export { $ol$style$Icon as Icon };
        export { $ol$style$IconImage as IconImage };
        export { $ol$style$IconImageCache as IconImageCache };
        export { $ol$style$Image as Image };
        export { $ol$style$RegularShape as RegularShape };
        export { $ol$style$Stroke as Stroke };
        export { $ol$style$Style as Style };
        export { $ol$style$Text as Text };
        export namespace flat {
            export { _ol_style_flat$createDefaultStyle as createDefaultStyle };
        }
    }
    export namespace tilecoord {
        export { _ol_tilecoord$createOrUpdate as createOrUpdate };
        export { _ol_tilecoord$fromKey as fromKey };
        export { _ol_tilecoord$getCacheKeyForTileKey as getCacheKeyForTileKey };
        export { _ol_tilecoord$getKey as getKey };
        export { _ol_tilecoord$getKeyZXY as getKeyZXY };
        export { _ol_tilecoord$hash as hash };
        export { _ol_tilecoord$hashZXY as hashZXY };
        export { _ol_tilecoord$withinExtentAndZ as withinExtentAndZ };
    }
    export namespace tilegrid {
        export { $ol$tilegrid$TileGrid as TileGrid };
        export { $ol$tilegrid$WMTS as WMTS };
        export namespace common {
            export { _ol_tilegrid_common$DEFAULT_MAX_ZOOM as DEFAULT_MAX_ZOOM };
            export { _ol_tilegrid_common$DEFAULT_TILE_SIZE as DEFAULT_TILE_SIZE };
        }
        export { _ol_tilegrid$createForExtent as createForExtent };
        export { _ol_tilegrid$createForProjection as createForProjection };
        export { _ol_tilegrid$createXYZ as createXYZ };
        export { _ol_tilegrid$extentFromProjection as extentFromProjection };
        export { _ol_tilegrid$getForProjection as getForProjection };
        export { _ol_tilegrid$wrapX as wrapX };
    }
    export namespace tileurlfunction {
        export { _ol_tileurlfunction$createFromTemplate as createFromTemplate };
        export { _ol_tileurlfunction$createFromTemplates as createFromTemplates };
        export { _ol_tileurlfunction$createFromTileUrlFunctions as createFromTileUrlFunctions };
        export { _ol_tileurlfunction$nullTileUrlFunction as nullTileUrlFunction };
    }
    export namespace transform {
        export { _ol_transform$apply as apply };
        export { _ol_transform$compose as compose };
        export { _ol_transform$composeCssTransform as composeCssTransform };
        export { _ol_transform$create as create };
        export { _ol_transform$determinant as determinant };
        export { _ol_transform$invert as invert };
        export { _ol_transform$makeInverse as makeInverse };
        export { _ol_transform$makeScale as makeScale };
        export { _ol_transform$multiply as multiply };
        export { _ol_transform$reset as reset };
        export { _ol_transform$rotate as rotate };
        export { _ol_transform$scale as scale };
        export { _ol_transform$set as set };
        export { _ol_transform$setFromArray as setFromArray };
        export { _ol_transform$toString as toString };
        export { _ol_transform$translate as translate };
    }
    export namespace uri {
        export { _ol_uri$appendParams as appendParams };
        export { _ol_uri$expandUrl as expandUrl };
        export { _ol_uri$pickUrl as pickUrl };
        export { _ol_uri$renderXYZTemplate as renderXYZTemplate };
    }
    export namespace util {
        export { _ol_util$VERSION as VERSION };
        export { _ol_util$abstract as abstract };
        export { _ol_util$getUid as getUid };
    }
    export namespace vec {
        namespace mat4 {
            export { _ol_vec_mat4$create as create };
            export { _ol_vec_mat4$fromTransform as fromTransform };
        }
    }
    export namespace webgl {
        export { _ol_webgl$ARRAY_BUFFER as ARRAY_BUFFER };
        export { $ol$webgl$BaseTileRepresentation as BaseTileRepresentation };
        export { $ol$webgl$Buffer as Buffer };
        export { _ol_webgl$DYNAMIC_DRAW as DYNAMIC_DRAW };
        export { _ol_webgl$ELEMENT_ARRAY_BUFFER as ELEMENT_ARRAY_BUFFER };
        export { _ol_webgl$FLOAT as FLOAT };
        export { $ol$webgl$Helper as Helper };
        export { $ol$webgl$PaletteTexture as PaletteTexture };
        export { $ol$webgl$PostProcessingPass as PostProcessingPass };
        export { $ol$webgl$RenderTarget as RenderTarget };
        export { _ol_webgl$STATIC_DRAW as STATIC_DRAW };
        export { _ol_webgl$STREAM_DRAW as STREAM_DRAW };
        export namespace ShaderBuilder {
            export { _ol_webgl_ShaderBuilder$COMMON_HEADER as COMMON_HEADER };
            export { _ol_webgl_ShaderBuilder$ShaderBuilder as ShaderBuilder };
        }
        export { $ol$webgl$TileGeometry as TileGeometry };
        export { $ol$webgl$TileTexture as TileTexture };
        export { _ol_webgl$UNSIGNED_BYTE as UNSIGNED_BYTE };
        export { _ol_webgl$UNSIGNED_INT as UNSIGNED_INT };
        export { _ol_webgl$UNSIGNED_SHORT as UNSIGNED_SHORT };
        export { _ol_webgl$getContext as getContext };
        export { _ol_webgl$getSupportedExtensions as getSupportedExtensions };
        export namespace styleparser {
            export { _ol_webgl_styleparser$computeHash as computeHash };
            export { _ol_webgl_styleparser$expressionToGlsl as expressionToGlsl };
            export { _ol_webgl_styleparser$packColor as packColor };
            export { _ol_webgl_styleparser$parseLiteralStyle as parseLiteralStyle };
        }
    }
    export namespace xml {
        export { _ol_xml$OBJECT_PROPERTY_NODE_FACTORY as OBJECT_PROPERTY_NODE_FACTORY };
        export { _ol_xml$XML_SCHEMA_INSTANCE_URI as XML_SCHEMA_INSTANCE_URI };
        export { _ol_xml$createElementNS as createElementNS };
        export { _ol_xml$getAllTextContent as getAllTextContent };
        export { _ol_xml$getAllTextContent_ as getAllTextContent_ };
        export { _ol_xml$getAttributeNS as getAttributeNS };
        export { _ol_xml$getDocument as getDocument };
        export { _ol_xml$getXMLSerializer as getXMLSerializer };
        export { _ol_xml$isDocument as isDocument };
        export { _ol_xml$makeArrayExtender as makeArrayExtender };
        export { _ol_xml$makeArrayPusher as makeArrayPusher };
        export { _ol_xml$makeArraySerializer as makeArraySerializer };
        export { _ol_xml$makeChildAppender as makeChildAppender };
        export { _ol_xml$makeObjectPropertyPusher as makeObjectPropertyPusher };
        export { _ol_xml$makeObjectPropertySetter as makeObjectPropertySetter };
        export { _ol_xml$makeReplacer as makeReplacer };
        export { _ol_xml$makeSequence as makeSequence };
        export { _ol_xml$makeSimpleNodeFactory as makeSimpleNodeFactory };
        export { _ol_xml$makeStructureNS as makeStructureNS };
        export { _ol_xml$parse as parse };
        export { _ol_xml$parseNode as parseNode };
        export { _ol_xml$pushParseAndPop as pushParseAndPop };
        export { _ol_xml$pushSerializeAndPop as pushSerializeAndPop };
        export { _ol_xml$registerDocument as registerDocument };
        export { _ol_xml$registerXMLSerializer as registerXMLSerializer };
        export { _ol_xml$serialize as serialize };
    }
    import VERSION = util.VERSION;
    export { VERSION };
    import getUid = util.getUid;
    export { getUid };
}
import $ol$Collection from '../../ol/Collection.js';
import $ol$DataTile from '../../ol/DataTile.js';
import $ol$Disposable from '../../ol/Disposable.js';
import $ol$Feature from '../../ol/Feature.js';
import $ol$Geolocation from '../../ol/Geolocation.js';
import $ol$Image from '../../ol/Image.js';
import $ol$ImageCanvas from '../../ol/ImageCanvas.js';
import $ol$ImageTile from '../../ol/ImageTile.js';
import $ol$Kinetic from '../../ol/Kinetic.js';
import $ol$Map from '../../ol/Map.js';
import $ol$MapBrowserEvent from '../../ol/MapBrowserEvent.js';
import $ol$MapBrowserEventHandler from '../../ol/MapBrowserEventHandler.js';
import $ol$MapEvent from '../../ol/MapEvent.js';
import $ol$Object from '../../ol/Object.js';
import $ol$Observable from '../../ol/Observable.js';
import $ol$Overlay from '../../ol/Overlay.js';
import $ol$Tile from '../../ol/Tile.js';
import $ol$TileCache from '../../ol/TileCache.js';
import $ol$TileQueue from '../../ol/TileQueue.js';
import $ol$TileRange from '../../ol/TileRange.js';
import $ol$VectorRenderTile from '../../ol/VectorRenderTile.js';
import $ol$VectorTile from '../../ol/VectorTile.js';
import $ol$View from '../../ol/View.js';
import { ascending as _ol_array$ascending } from '../../ol/array.js';
import { binarySearch as _ol_array$binarySearch } from '../../ol/array.js';
import { descending as _ol_array$descending } from '../../ol/array.js';
import { equals as _ol_array$equals } from '../../ol/array.js';
import { extend as _ol_array$extend } from '../../ol/array.js';
import { isSorted as _ol_array$isSorted } from '../../ol/array.js';
import { linearFindNearest as _ol_array$linearFindNearest } from '../../ol/array.js';
import { remove as _ol_array$remove } from '../../ol/array.js';
import { reverseSubArray as _ol_array$reverseSubArray } from '../../ol/array.js';
import { stableSort as _ol_array$stableSort } from '../../ol/array.js';
import { assert as _ol_asserts$assert } from '../../ol/asserts.js';
import { createExtent as _ol_centerconstraint$createExtent } from '../../ol/centerconstraint.js';
import { none as _ol_centerconstraint$none } from '../../ol/centerconstraint.js';
import { NO_COLOR as _ol_color$NO_COLOR } from '../../ol/color.js';
import { asArray as _ol_color$asArray } from '../../ol/color.js';
import { asString as _ol_color$asString } from '../../ol/color.js';
import { fromString as _ol_color$fromString } from '../../ol/color.js';
import { isStringColor as _ol_color$isStringColor } from '../../ol/color.js';
import { lchaToRgba as _ol_color$lchaToRgba } from '../../ol/color.js';
import { normalize as _ol_color$normalize } from '../../ol/color.js';
import { rgbaToLcha as _ol_color$rgbaToLcha } from '../../ol/color.js';
import { toString as _ol_color$toString } from '../../ol/color.js';
import { withAlpha as _ol_color$withAlpha } from '../../ol/color.js';
import { asColorLike as _ol_colorlike$asColorLike } from '../../ol/colorlike.js';
import { error as _ol_console$error } from '../../ol/console.js';
import { log as _ol_console$log } from '../../ol/console.js';
import { setLevel as _ol_console$setLevel } from '../../ol/console.js';
import { warn as _ol_console$warn } from '../../ol/console.js';
import $ol$control$Attribution from '../../ol/control/Attribution.js';
import $ol$control$Control from '../../ol/control/Control.js';
import $ol$control$FullScreen from '../../ol/control/FullScreen.js';
import $ol$control$MousePosition from '../../ol/control/MousePosition.js';
import $ol$control$OverviewMap from '../../ol/control/OverviewMap.js';
import $ol$control$Rotate from '../../ol/control/Rotate.js';
import $ol$control$ScaleLine from '../../ol/control/ScaleLine.js';
import $ol$control$Zoom from '../../ol/control/Zoom.js';
import $ol$control$ZoomSlider from '../../ol/control/ZoomSlider.js';
import $ol$control$ZoomToExtent from '../../ol/control/ZoomToExtent.js';
import { defaults as _ol_control_defaults$defaults } from '../../ol/control/defaults.js';
import { add as _ol_coordinate$add } from '../../ol/coordinate.js';
import { closestOnCircle as _ol_coordinate$closestOnCircle } from '../../ol/coordinate.js';
import { closestOnSegment as _ol_coordinate$closestOnSegment } from '../../ol/coordinate.js';
import { createStringXY as _ol_coordinate$createStringXY } from '../../ol/coordinate.js';
import { degreesToStringHDMS as _ol_coordinate$degreesToStringHDMS } from '../../ol/coordinate.js';
import { distance as _ol_coordinate$distance } from '../../ol/coordinate.js';
import { equals as _ol_coordinate$equals } from '../../ol/coordinate.js';
import { format as _ol_coordinate$format } from '../../ol/coordinate.js';
import { getWorldsAway as _ol_coordinate$getWorldsAway } from '../../ol/coordinate.js';
import { rotate as _ol_coordinate$rotate } from '../../ol/coordinate.js';
import { scale as _ol_coordinate$scale } from '../../ol/coordinate.js';
import { squaredDistance as _ol_coordinate$squaredDistance } from '../../ol/coordinate.js';
import { squaredDistanceToSegment as _ol_coordinate$squaredDistanceToSegment } from '../../ol/coordinate.js';
import { toStringHDMS as _ol_coordinate$toStringHDMS } from '../../ol/coordinate.js';
import { toStringXY as _ol_coordinate$toStringXY } from '../../ol/coordinate.js';
import { wrapX as _ol_coordinate$wrapX } from '../../ol/coordinate.js';
import { CLASS_COLLAPSED as _ol_css$CLASS_COLLAPSED } from '../../ol/css.js';
import { CLASS_CONTROL as _ol_css$CLASS_CONTROL } from '../../ol/css.js';
import { CLASS_HIDDEN as _ol_css$CLASS_HIDDEN } from '../../ol/css.js';
import { CLASS_SELECTABLE as _ol_css$CLASS_SELECTABLE } from '../../ol/css.js';
import { CLASS_UNSELECTABLE as _ol_css$CLASS_UNSELECTABLE } from '../../ol/css.js';
import { CLASS_UNSUPPORTED as _ol_css$CLASS_UNSUPPORTED } from '../../ol/css.js';
import { getFontParameters as _ol_css$getFontParameters } from '../../ol/css.js';
import { createCanvasContext2D as _ol_dom$createCanvasContext2D } from '../../ol/dom.js';
import { getSharedCanvasContext2D as _ol_dom$getSharedCanvasContext2D } from '../../ol/dom.js';
import { outerHeight as _ol_dom$outerHeight } from '../../ol/dom.js';
import { outerWidth as _ol_dom$outerWidth } from '../../ol/dom.js';
import { releaseCanvas as _ol_dom$releaseCanvas } from '../../ol/dom.js';
import { removeChildren as _ol_dom$removeChildren } from '../../ol/dom.js';
import { replaceChildren as _ol_dom$replaceChildren } from '../../ol/dom.js';
import { replaceNode as _ol_dom$replaceNode } from '../../ol/dom.js';
import { easeIn as _ol_easing$easeIn } from '../../ol/easing.js';
import { easeOut as _ol_easing$easeOut } from '../../ol/easing.js';
import { inAndOut as _ol_easing$inAndOut } from '../../ol/easing.js';
import { linear as _ol_easing$linear } from '../../ol/easing.js';
import { upAndDown as _ol_easing$upAndDown } from '../../ol/easing.js';
import $ol$events$Event from '../../ol/events/Event.js';
import { SnapEvent as _ol_events_SnapEvent$SnapEvent } from '../../ol/events/SnapEvent.js';
import $ol$events$Target from '../../ol/events/Target.js';
import { all as _ol_events_condition$all } from '../../ol/events/condition.js';
import { altKeyOnly as _ol_events_condition$altKeyOnly } from '../../ol/events/condition.js';
import { altShiftKeysOnly as _ol_events_condition$altShiftKeysOnly } from '../../ol/events/condition.js';
import { always as _ol_events_condition$always } from '../../ol/events/condition.js';
import { click as _ol_events_condition$click } from '../../ol/events/condition.js';
import { doubleClick as _ol_events_condition$doubleClick } from '../../ol/events/condition.js';
import { focus as _ol_events_condition$focus } from '../../ol/events/condition.js';
import { focusWithTabindex as _ol_events_condition$focusWithTabindex } from '../../ol/events/condition.js';
import { mouseActionButton as _ol_events_condition$mouseActionButton } from '../../ol/events/condition.js';
import { mouseOnly as _ol_events_condition$mouseOnly } from '../../ol/events/condition.js';
import { never as _ol_events_condition$never } from '../../ol/events/condition.js';
import { noModifierKeys as _ol_events_condition$noModifierKeys } from '../../ol/events/condition.js';
import { penOnly as _ol_events_condition$penOnly } from '../../ol/events/condition.js';
import { platformModifierKey as _ol_events_condition$platformModifierKey } from '../../ol/events/condition.js';
import { platformModifierKeyOnly as _ol_events_condition$platformModifierKeyOnly } from '../../ol/events/condition.js';
import { pointerMove as _ol_events_condition$pointerMove } from '../../ol/events/condition.js';
import { primaryAction as _ol_events_condition$primaryAction } from '../../ol/events/condition.js';
import { shiftKeyOnly as _ol_events_condition$shiftKeyOnly } from '../../ol/events/condition.js';
import { singleClick as _ol_events_condition$singleClick } from '../../ol/events/condition.js';
import { targetNotEditable as _ol_events_condition$targetNotEditable } from '../../ol/events/condition.js';
import { touchOnly as _ol_events_condition$touchOnly } from '../../ol/events/condition.js';
import { listen as _ol_events$listen } from '../../ol/events.js';
import { listenOnce as _ol_events$listenOnce } from '../../ol/events.js';
import { unlistenByKey as _ol_events$unlistenByKey } from '../../ol/events.js';
import { buildExpression as _ol_expr_cpu$buildExpression } from '../../ol/expr/cpu.js';
import { newEvaluationContext as _ol_expr_cpu$newEvaluationContext } from '../../ol/expr/cpu.js';
import { AnyType as _ol_expr_expression$AnyType } from '../../ol/expr/expression.js';
import { BooleanType as _ol_expr_expression$BooleanType } from '../../ol/expr/expression.js';
import { CallExpression as _ol_expr_expression$CallExpression } from '../../ol/expr/expression.js';
import { ColorType as _ol_expr_expression$ColorType } from '../../ol/expr/expression.js';
import { LiteralExpression as _ol_expr_expression$LiteralExpression } from '../../ol/expr/expression.js';
import { NoneType as _ol_expr_expression$NoneType } from '../../ol/expr/expression.js';
import { NumberArrayType as _ol_expr_expression$NumberArrayType } from '../../ol/expr/expression.js';
import { NumberType as _ol_expr_expression$NumberType } from '../../ol/expr/expression.js';
import { Ops as _ol_expr_expression$Ops } from '../../ol/expr/expression.js';
import { SizeType as _ol_expr_expression$SizeType } from '../../ol/expr/expression.js';
import { StringType as _ol_expr_expression$StringType } from '../../ol/expr/expression.js';
import { computeGeometryType as _ol_expr_expression$computeGeometryType } from '../../ol/expr/expression.js';
import { includesType as _ol_expr_expression$includesType } from '../../ol/expr/expression.js';
import { isType as _ol_expr_expression$isType } from '../../ol/expr/expression.js';
import { newParsingContext as _ol_expr_expression$newParsingContext } from '../../ol/expr/expression.js';
import { overlapsType as _ol_expr_expression$overlapsType } from '../../ol/expr/expression.js';
import { parse as _ol_expr_expression$parse } from '../../ol/expr/expression.js';
import { typeName as _ol_expr_expression$typeName } from '../../ol/expr/expression.js';
import { PALETTE_TEXTURE_ARRAY as _ol_expr_gpu$PALETTE_TEXTURE_ARRAY } from '../../ol/expr/gpu.js';
import { arrayToGlsl as _ol_expr_gpu$arrayToGlsl } from '../../ol/expr/gpu.js';
import { buildExpression as _ol_expr_gpu$buildExpression } from '../../ol/expr/gpu.js';
import { colorToGlsl as _ol_expr_gpu$colorToGlsl } from '../../ol/expr/gpu.js';
import { getStringNumberEquivalent as _ol_expr_gpu$getStringNumberEquivalent } from '../../ol/expr/gpu.js';
import { newCompilationContext as _ol_expr_gpu$newCompilationContext } from '../../ol/expr/gpu.js';
import { numberToGlsl as _ol_expr_gpu$numberToGlsl } from '../../ol/expr/gpu.js';
import { sizeToGlsl as _ol_expr_gpu$sizeToGlsl } from '../../ol/expr/gpu.js';
import { stringToGlsl as _ol_expr_gpu$stringToGlsl } from '../../ol/expr/gpu.js';
import { uniformNameForVariable as _ol_expr_gpu$uniformNameForVariable } from '../../ol/expr/gpu.js';
import { applyTransform as _ol_extent$applyTransform } from '../../ol/extent.js';
import { approximatelyEquals as _ol_extent$approximatelyEquals } from '../../ol/extent.js';
import { boundingExtent as _ol_extent$boundingExtent } from '../../ol/extent.js';
import { buffer as _ol_extent$buffer } from '../../ol/extent.js';
import { clone as _ol_extent$clone } from '../../ol/extent.js';
import { closestSquaredDistanceXY as _ol_extent$closestSquaredDistanceXY } from '../../ol/extent.js';
import { containsCoordinate as _ol_extent$containsCoordinate } from '../../ol/extent.js';
import { containsExtent as _ol_extent$containsExtent } from '../../ol/extent.js';
import { containsXY as _ol_extent$containsXY } from '../../ol/extent.js';
import { coordinateRelationship as _ol_extent$coordinateRelationship } from '../../ol/extent.js';
import { createEmpty as _ol_extent$createEmpty } from '../../ol/extent.js';
import { createOrUpdate as _ol_extent$createOrUpdate } from '../../ol/extent.js';
import { createOrUpdateEmpty as _ol_extent$createOrUpdateEmpty } from '../../ol/extent.js';
import { createOrUpdateFromCoordinate as _ol_extent$createOrUpdateFromCoordinate } from '../../ol/extent.js';
import { createOrUpdateFromCoordinates as _ol_extent$createOrUpdateFromCoordinates } from '../../ol/extent.js';
import { createOrUpdateFromFlatCoordinates as _ol_extent$createOrUpdateFromFlatCoordinates } from '../../ol/extent.js';
import { createOrUpdateFromRings as _ol_extent$createOrUpdateFromRings } from '../../ol/extent.js';
import { equals as _ol_extent$equals } from '../../ol/extent.js';
import { extend as _ol_extent$extend } from '../../ol/extent.js';
import { extendCoordinate as _ol_extent$extendCoordinate } from '../../ol/extent.js';
import { extendCoordinates as _ol_extent$extendCoordinates } from '../../ol/extent.js';
import { extendFlatCoordinates as _ol_extent$extendFlatCoordinates } from '../../ol/extent.js';
import { extendRings as _ol_extent$extendRings } from '../../ol/extent.js';
import { extendXY as _ol_extent$extendXY } from '../../ol/extent.js';
import { forEachCorner as _ol_extent$forEachCorner } from '../../ol/extent.js';
import { getArea as _ol_extent$getArea } from '../../ol/extent.js';
import { getBottomLeft as _ol_extent$getBottomLeft } from '../../ol/extent.js';
import { getBottomRight as _ol_extent$getBottomRight } from '../../ol/extent.js';
import { getCenter as _ol_extent$getCenter } from '../../ol/extent.js';
import { getCorner as _ol_extent$getCorner } from '../../ol/extent.js';
import { getEnlargedArea as _ol_extent$getEnlargedArea } from '../../ol/extent.js';
import { getForViewAndSize as _ol_extent$getForViewAndSize } from '../../ol/extent.js';
import { getHeight as _ol_extent$getHeight } from '../../ol/extent.js';
import { getIntersection as _ol_extent$getIntersection } from '../../ol/extent.js';
import { getIntersectionArea as _ol_extent$getIntersectionArea } from '../../ol/extent.js';
import { getMargin as _ol_extent$getMargin } from '../../ol/extent.js';
import { getRotatedViewport as _ol_extent$getRotatedViewport } from '../../ol/extent.js';
import { getSize as _ol_extent$getSize } from '../../ol/extent.js';
import { getTopLeft as _ol_extent$getTopLeft } from '../../ol/extent.js';
import { getTopRight as _ol_extent$getTopRight } from '../../ol/extent.js';
import { getWidth as _ol_extent$getWidth } from '../../ol/extent.js';
import { intersects as _ol_extent$intersects } from '../../ol/extent.js';
import { intersectsSegment as _ol_extent$intersectsSegment } from '../../ol/extent.js';
import { isEmpty as _ol_extent$isEmpty } from '../../ol/extent.js';
import { returnOrUpdate as _ol_extent$returnOrUpdate } from '../../ol/extent.js';
import { scaleFromCenter as _ol_extent$scaleFromCenter } from '../../ol/extent.js';
import { wrapAndSliceX as _ol_extent$wrapAndSliceX } from '../../ol/extent.js';
import { wrapX as _ol_extent$wrapX } from '../../ol/extent.js';
import { loadFeaturesXhr as _ol_featureloader$loadFeaturesXhr } from '../../ol/featureloader.js';
import { setWithCredentials as _ol_featureloader$setWithCredentials } from '../../ol/featureloader.js';
import { xhr as _ol_featureloader$xhr } from '../../ol/featureloader.js';
import $ol$format$EsriJSON from '../../ol/format/EsriJSON.js';
import $ol$format$Feature from '../../ol/format/Feature.js';
import $ol$format$GML from '../../ol/format/GML.js';
import $ol$format$GML2 from '../../ol/format/GML2.js';
import $ol$format$GML3 from '../../ol/format/GML3.js';
import $ol$format$GML32 from '../../ol/format/GML32.js';
import $ol$format$GMLBase from '../../ol/format/GMLBase.js';
import $ol$format$GPX from '../../ol/format/GPX.js';
import $ol$format$GeoJSON from '../../ol/format/GeoJSON.js';
import $ol$format$IGC from '../../ol/format/IGC.js';
import $ol$format$IIIFInfo from '../../ol/format/IIIFInfo.js';
import $ol$format$JSONFeature from '../../ol/format/JSONFeature.js';
import $ol$format$KML from '../../ol/format/KML.js';
import $ol$format$MVT from '../../ol/format/MVT.js';
import $ol$format$OSMXML from '../../ol/format/OSMXML.js';
import $ol$format$OWS from '../../ol/format/OWS.js';
import $ol$format$Polyline from '../../ol/format/Polyline.js';
import $ol$format$TextFeature from '../../ol/format/TextFeature.js';
import $ol$format$TopoJSON from '../../ol/format/TopoJSON.js';
import $ol$format$WFS from '../../ol/format/WFS.js';
import $ol$format$WKB from '../../ol/format/WKB.js';
import $ol$format$WKT from '../../ol/format/WKT.js';
import $ol$format$WMSCapabilities from '../../ol/format/WMSCapabilities.js';
import $ol$format$WMSGetFeatureInfo from '../../ol/format/WMSGetFeatureInfo.js';
import $ol$format$WMTSCapabilities from '../../ol/format/WMTSCapabilities.js';
import $ol$format$XML from '../../ol/format/XML.js';
import $ol$format$XMLFeature from '../../ol/format/XMLFeature.js';
import $ol$format$filter$And from '../../ol/format/filter/And.js';
import $ol$format$filter$Bbox from '../../ol/format/filter/Bbox.js';
import $ol$format$filter$Comparison from '../../ol/format/filter/Comparison.js';
import $ol$format$filter$ComparisonBinary from '../../ol/format/filter/ComparisonBinary.js';
import $ol$format$filter$Contains from '../../ol/format/filter/Contains.js';
import $ol$format$filter$DWithin from '../../ol/format/filter/DWithin.js';
import $ol$format$filter$Disjoint from '../../ol/format/filter/Disjoint.js';
import $ol$format$filter$During from '../../ol/format/filter/During.js';
import $ol$format$filter$EqualTo from '../../ol/format/filter/EqualTo.js';
import $ol$format$filter$Filter from '../../ol/format/filter/Filter.js';
import $ol$format$filter$GreaterThan from '../../ol/format/filter/GreaterThan.js';
import $ol$format$filter$GreaterThanOrEqualTo from '../../ol/format/filter/GreaterThanOrEqualTo.js';
import $ol$format$filter$Intersects from '../../ol/format/filter/Intersects.js';
import $ol$format$filter$IsBetween from '../../ol/format/filter/IsBetween.js';
import $ol$format$filter$IsLike from '../../ol/format/filter/IsLike.js';
import $ol$format$filter$IsNull from '../../ol/format/filter/IsNull.js';
import $ol$format$filter$LessThan from '../../ol/format/filter/LessThan.js';
import $ol$format$filter$LessThanOrEqualTo from '../../ol/format/filter/LessThanOrEqualTo.js';
import $ol$format$filter$LogicalNary from '../../ol/format/filter/LogicalNary.js';
import $ol$format$filter$Not from '../../ol/format/filter/Not.js';
import $ol$format$filter$NotEqualTo from '../../ol/format/filter/NotEqualTo.js';
import $ol$format$filter$Or from '../../ol/format/filter/Or.js';
import $ol$format$filter$ResourceId from '../../ol/format/filter/ResourceId.js';
import $ol$format$filter$Spatial from '../../ol/format/filter/Spatial.js';
import $ol$format$filter$Within from '../../ol/format/filter/Within.js';
import { and as _ol_format_filter$and } from '../../ol/format/filter.js';
import { bbox as _ol_format_filter$bbox } from '../../ol/format/filter.js';
import { between as _ol_format_filter$between } from '../../ol/format/filter.js';
import { contains as _ol_format_filter$contains } from '../../ol/format/filter.js';
import { disjoint as _ol_format_filter$disjoint } from '../../ol/format/filter.js';
import { during as _ol_format_filter$during } from '../../ol/format/filter.js';
import { dwithin as _ol_format_filter$dwithin } from '../../ol/format/filter.js';
import { equalTo as _ol_format_filter$equalTo } from '../../ol/format/filter.js';
import { greaterThan as _ol_format_filter$greaterThan } from '../../ol/format/filter.js';
import { greaterThanOrEqualTo as _ol_format_filter$greaterThanOrEqualTo } from '../../ol/format/filter.js';
import { intersects as _ol_format_filter$intersects } from '../../ol/format/filter.js';
import { isNull as _ol_format_filter$isNull } from '../../ol/format/filter.js';
import { lessThan as _ol_format_filter$lessThan } from '../../ol/format/filter.js';
import { lessThanOrEqualTo as _ol_format_filter$lessThanOrEqualTo } from '../../ol/format/filter.js';
import { like as _ol_format_filter$like } from '../../ol/format/filter.js';
import { not as _ol_format_filter$not } from '../../ol/format/filter.js';
import { notEqualTo as _ol_format_filter$notEqualTo } from '../../ol/format/filter.js';
import { or as _ol_format_filter$or } from '../../ol/format/filter.js';
import { resourceId as _ol_format_filter$resourceId } from '../../ol/format/filter.js';
import { within as _ol_format_filter$within } from '../../ol/format/filter.js';
import { readHref as _ol_format_xlink$readHref } from '../../ol/format/xlink.js';
import { readBoolean as _ol_format_xsd$readBoolean } from '../../ol/format/xsd.js';
import { readBooleanString as _ol_format_xsd$readBooleanString } from '../../ol/format/xsd.js';
import { readDateTime as _ol_format_xsd$readDateTime } from '../../ol/format/xsd.js';
import { readDecimal as _ol_format_xsd$readDecimal } from '../../ol/format/xsd.js';
import { readDecimalString as _ol_format_xsd$readDecimalString } from '../../ol/format/xsd.js';
import { readNonNegativeIntegerString as _ol_format_xsd$readNonNegativeIntegerString } from '../../ol/format/xsd.js';
import { readPositiveInteger as _ol_format_xsd$readPositiveInteger } from '../../ol/format/xsd.js';
import { readString as _ol_format_xsd$readString } from '../../ol/format/xsd.js';
import { writeBooleanTextNode as _ol_format_xsd$writeBooleanTextNode } from '../../ol/format/xsd.js';
import { writeCDATASection as _ol_format_xsd$writeCDATASection } from '../../ol/format/xsd.js';
import { writeDateTimeTextNode as _ol_format_xsd$writeDateTimeTextNode } from '../../ol/format/xsd.js';
import { writeDecimalTextNode as _ol_format_xsd$writeDecimalTextNode } from '../../ol/format/xsd.js';
import { writeNonNegativeIntegerTextNode as _ol_format_xsd$writeNonNegativeIntegerTextNode } from '../../ol/format/xsd.js';
import { writeStringTextNode as _ol_format_xsd$writeStringTextNode } from '../../ol/format/xsd.js';
import { FALSE as _ol_functions$FALSE } from '../../ol/functions.js';
import { TRUE as _ol_functions$TRUE } from '../../ol/functions.js';
import { VOID as _ol_functions$VOID } from '../../ol/functions.js';
import { memoizeOne as _ol_functions$memoizeOne } from '../../ol/functions.js';
import { toPromise as _ol_functions$toPromise } from '../../ol/functions.js';
import $ol$geom$Circle from '../../ol/geom/Circle.js';
import $ol$geom$Geometry from '../../ol/geom/Geometry.js';
import $ol$geom$GeometryCollection from '../../ol/geom/GeometryCollection.js';
import $ol$geom$LineString from '../../ol/geom/LineString.js';
import $ol$geom$LinearRing from '../../ol/geom/LinearRing.js';
import $ol$geom$MultiLineString from '../../ol/geom/MultiLineString.js';
import $ol$geom$MultiPoint from '../../ol/geom/MultiPoint.js';
import $ol$geom$MultiPolygon from '../../ol/geom/MultiPolygon.js';
import $ol$geom$Point from '../../ol/geom/Point.js';
import $ol$geom$Polygon from '../../ol/geom/Polygon.js';
import $ol$geom$SimpleGeometry from '../../ol/geom/SimpleGeometry.js';
import { linearRing as _ol_geom_flat_area$linearRing } from '../../ol/geom/flat/area.js';
import { linearRings as _ol_geom_flat_area$linearRings } from '../../ol/geom/flat/area.js';
import { linearRingss as _ol_geom_flat_area$linearRingss } from '../../ol/geom/flat/area.js';
import { linearRingss as _ol_geom_flat_center$linearRingss } from '../../ol/geom/flat/center.js';
import { arrayMaxSquaredDelta as _ol_geom_flat_closest$arrayMaxSquaredDelta } from '../../ol/geom/flat/closest.js';
import { assignClosestArrayPoint as _ol_geom_flat_closest$assignClosestArrayPoint } from '../../ol/geom/flat/closest.js';
import { assignClosestMultiArrayPoint as _ol_geom_flat_closest$assignClosestMultiArrayPoint } from '../../ol/geom/flat/closest.js';
import { assignClosestPoint as _ol_geom_flat_closest$assignClosestPoint } from '../../ol/geom/flat/closest.js';
import { maxSquaredDelta as _ol_geom_flat_closest$maxSquaredDelta } from '../../ol/geom/flat/closest.js';
import { multiArrayMaxSquaredDelta as _ol_geom_flat_closest$multiArrayMaxSquaredDelta } from '../../ol/geom/flat/closest.js';
import { linearRingContainsExtent as _ol_geom_flat_contains$linearRingContainsExtent } from '../../ol/geom/flat/contains.js';
import { linearRingContainsXY as _ol_geom_flat_contains$linearRingContainsXY } from '../../ol/geom/flat/contains.js';
import { linearRingsContainsXY as _ol_geom_flat_contains$linearRingsContainsXY } from '../../ol/geom/flat/contains.js';
import { linearRingssContainsXY as _ol_geom_flat_contains$linearRingssContainsXY } from '../../ol/geom/flat/contains.js';
import { deflateCoordinate as _ol_geom_flat_deflate$deflateCoordinate } from '../../ol/geom/flat/deflate.js';
import { deflateCoordinates as _ol_geom_flat_deflate$deflateCoordinates } from '../../ol/geom/flat/deflate.js';
import { deflateCoordinatesArray as _ol_geom_flat_deflate$deflateCoordinatesArray } from '../../ol/geom/flat/deflate.js';
import { deflateMultiCoordinatesArray as _ol_geom_flat_deflate$deflateMultiCoordinatesArray } from '../../ol/geom/flat/deflate.js';
import { flipXY as _ol_geom_flat_flip$flipXY } from '../../ol/geom/flat/flip.js';
import { greatCircleArc as _ol_geom_flat_geodesic$greatCircleArc } from '../../ol/geom/flat/geodesic.js';
import { meridian as _ol_geom_flat_geodesic$meridian } from '../../ol/geom/flat/geodesic.js';
import { parallel as _ol_geom_flat_geodesic$parallel } from '../../ol/geom/flat/geodesic.js';
import { inflateCoordinates as _ol_geom_flat_inflate$inflateCoordinates } from '../../ol/geom/flat/inflate.js';
import { inflateCoordinatesArray as _ol_geom_flat_inflate$inflateCoordinatesArray } from '../../ol/geom/flat/inflate.js';
import { inflateMultiCoordinatesArray as _ol_geom_flat_inflate$inflateMultiCoordinatesArray } from '../../ol/geom/flat/inflate.js';
import { getInteriorPointOfArray as _ol_geom_flat_interiorpoint$getInteriorPointOfArray } from '../../ol/geom/flat/interiorpoint.js';
import { getInteriorPointsOfMultiArray as _ol_geom_flat_interiorpoint$getInteriorPointsOfMultiArray } from '../../ol/geom/flat/interiorpoint.js';
import { interpolatePoint as _ol_geom_flat_interpolate$interpolatePoint } from '../../ol/geom/flat/interpolate.js';
import { lineStringCoordinateAtM as _ol_geom_flat_interpolate$lineStringCoordinateAtM } from '../../ol/geom/flat/interpolate.js';
import { lineStringsCoordinateAtM as _ol_geom_flat_interpolate$lineStringsCoordinateAtM } from '../../ol/geom/flat/interpolate.js';
import { intersectsLineString as _ol_geom_flat_intersectsextent$intersectsLineString } from '../../ol/geom/flat/intersectsextent.js';
import { intersectsLineStringArray as _ol_geom_flat_intersectsextent$intersectsLineStringArray } from '../../ol/geom/flat/intersectsextent.js';
import { intersectsLinearRing as _ol_geom_flat_intersectsextent$intersectsLinearRing } from '../../ol/geom/flat/intersectsextent.js';
import { intersectsLinearRingArray as _ol_geom_flat_intersectsextent$intersectsLinearRingArray } from '../../ol/geom/flat/intersectsextent.js';
import { intersectsLinearRingMultiArray as _ol_geom_flat_intersectsextent$intersectsLinearRingMultiArray } from '../../ol/geom/flat/intersectsextent.js';
import { lineStringLength as _ol_geom_flat_length$lineStringLength } from '../../ol/geom/flat/length.js';
import { linearRingLength as _ol_geom_flat_length$linearRingLength } from '../../ol/geom/flat/length.js';
import { inflateEnds as _ol_geom_flat_orient$inflateEnds } from '../../ol/geom/flat/orient.js';
import { linearRingIsClockwise as _ol_geom_flat_orient$linearRingIsClockwise } from '../../ol/geom/flat/orient.js';
import { linearRingsAreOriented as _ol_geom_flat_orient$linearRingsAreOriented } from '../../ol/geom/flat/orient.js';
import { linearRingssAreOriented as _ol_geom_flat_orient$linearRingssAreOriented } from '../../ol/geom/flat/orient.js';
import { orientLinearRings as _ol_geom_flat_orient$orientLinearRings } from '../../ol/geom/flat/orient.js';
import { orientLinearRingsArray as _ol_geom_flat_orient$orientLinearRingsArray } from '../../ol/geom/flat/orient.js';
import { coordinates as _ol_geom_flat_reverse$coordinates } from '../../ol/geom/flat/reverse.js';
import { forEach as _ol_geom_flat_segments$forEach } from '../../ol/geom/flat/segments.js';
import { douglasPeucker as _ol_geom_flat_simplify$douglasPeucker } from '../../ol/geom/flat/simplify.js';
import { douglasPeuckerArray as _ol_geom_flat_simplify$douglasPeuckerArray } from '../../ol/geom/flat/simplify.js';
import { douglasPeuckerMultiArray as _ol_geom_flat_simplify$douglasPeuckerMultiArray } from '../../ol/geom/flat/simplify.js';
import { quantize as _ol_geom_flat_simplify$quantize } from '../../ol/geom/flat/simplify.js';
import { quantizeArray as _ol_geom_flat_simplify$quantizeArray } from '../../ol/geom/flat/simplify.js';
import { quantizeMultiArray as _ol_geom_flat_simplify$quantizeMultiArray } from '../../ol/geom/flat/simplify.js';
import { radialDistance as _ol_geom_flat_simplify$radialDistance } from '../../ol/geom/flat/simplify.js';
import { simplifyLineString as _ol_geom_flat_simplify$simplifyLineString } from '../../ol/geom/flat/simplify.js';
import { snap as _ol_geom_flat_simplify$snap } from '../../ol/geom/flat/simplify.js';
import { matchingChunk as _ol_geom_flat_straightchunk$matchingChunk } from '../../ol/geom/flat/straightchunk.js';
import { drawTextOnPath as _ol_geom_flat_textpath$drawTextOnPath } from '../../ol/geom/flat/textpath.js';
import { lineStringIsClosed as _ol_geom_flat_topology$lineStringIsClosed } from '../../ol/geom/flat/topology.js';
import { rotate as _ol_geom_flat_transform$rotate } from '../../ol/geom/flat/transform.js';
import { scale as _ol_geom_flat_transform$scale } from '../../ol/geom/flat/transform.js';
import { transform2D as _ol_geom_flat_transform$transform2D } from '../../ol/geom/flat/transform.js';
import { translate as _ol_geom_flat_transform$translate } from '../../ol/geom/flat/transform.js';
import { CREATE_IMAGE_BITMAP as _ol_has$CREATE_IMAGE_BITMAP } from '../../ol/has.js';
import { DEVICE_PIXEL_RATIO as _ol_has$DEVICE_PIXEL_RATIO } from '../../ol/has.js';
import { FIREFOX as _ol_has$FIREFOX } from '../../ol/has.js';
import { IMAGE_DECODE as _ol_has$IMAGE_DECODE } from '../../ol/has.js';
import { MAC as _ol_has$MAC } from '../../ol/has.js';
import { PASSIVE_EVENT_LISTENERS as _ol_has$PASSIVE_EVENT_LISTENERS } from '../../ol/has.js';
import { SAFARI as _ol_has$SAFARI } from '../../ol/has.js';
import { SAFARI_BUG_237906 as _ol_has$SAFARI_BUG_237906 } from '../../ol/has.js';
import { WEBKIT as _ol_has$WEBKIT } from '../../ol/has.js';
import { WORKER_OFFSCREEN_CANVAS as _ol_has$WORKER_OFFSCREEN_CANVAS } from '../../ol/has.js';
import $ol$interaction$DblClickDragZoom from '../../ol/interaction/DblClickDragZoom.js';
import $ol$interaction$DoubleClickZoom from '../../ol/interaction/DoubleClickZoom.js';
import $ol$interaction$DragAndDrop from '../../ol/interaction/DragAndDrop.js';
import $ol$interaction$DragBox from '../../ol/interaction/DragBox.js';
import $ol$interaction$DragPan from '../../ol/interaction/DragPan.js';
import $ol$interaction$DragRotate from '../../ol/interaction/DragRotate.js';
import $ol$interaction$DragRotateAndZoom from '../../ol/interaction/DragRotateAndZoom.js';
import $ol$interaction$DragZoom from '../../ol/interaction/DragZoom.js';
import $ol$interaction$Draw from '../../ol/interaction/Draw.js';
import $ol$interaction$Extent from '../../ol/interaction/Extent.js';
import $ol$interaction$Interaction from '../../ol/interaction/Interaction.js';
import $ol$interaction$KeyboardPan from '../../ol/interaction/KeyboardPan.js';
import $ol$interaction$KeyboardZoom from '../../ol/interaction/KeyboardZoom.js';
import $ol$interaction$Link from '../../ol/interaction/Link.js';
import $ol$interaction$Modify from '../../ol/interaction/Modify.js';
import $ol$interaction$MouseWheelZoom from '../../ol/interaction/MouseWheelZoom.js';
import $ol$interaction$PinchRotate from '../../ol/interaction/PinchRotate.js';
import $ol$interaction$PinchZoom from '../../ol/interaction/PinchZoom.js';
import $ol$interaction$Pointer from '../../ol/interaction/Pointer.js';
import $ol$interaction$Select from '../../ol/interaction/Select.js';
import $ol$interaction$Snap from '../../ol/interaction/Snap.js';
import $ol$interaction$Translate from '../../ol/interaction/Translate.js';
import { defaults as _ol_interaction_defaults$defaults } from '../../ol/interaction/defaults.js';
import $ol$layer$Base from '../../ol/layer/Base.js';
import $ol$layer$BaseImage from '../../ol/layer/BaseImage.js';
import $ol$layer$BaseTile from '../../ol/layer/BaseTile.js';
import $ol$layer$BaseVector from '../../ol/layer/BaseVector.js';
import $ol$layer$Flow from '../../ol/layer/Flow.js';
import $ol$layer$Graticule from '../../ol/layer/Graticule.js';
import $ol$layer$Group from '../../ol/layer/Group.js';
import $ol$layer$Heatmap from '../../ol/layer/Heatmap.js';
import $ol$layer$Image from '../../ol/layer/Image.js';
import $ol$layer$Layer from '../../ol/layer/Layer.js';
import $ol$layer$Tile from '../../ol/layer/Tile.js';
import $ol$layer$Vector from '../../ol/layer/Vector.js';
import $ol$layer$VectorImage from '../../ol/layer/VectorImage.js';
import $ol$layer$VectorTile from '../../ol/layer/VectorTile.js';
import $ol$layer$WebGLPoints from '../../ol/layer/WebGLPoints.js';
import $ol$layer$WebGLTile from '../../ol/layer/WebGLTile.js';
import { all as _ol_loadingstrategy$all } from '../../ol/loadingstrategy.js';
import { bbox as _ol_loadingstrategy$bbox } from '../../ol/loadingstrategy.js';
import { tile as _ol_loadingstrategy$tile } from '../../ol/loadingstrategy.js';
import { ceil as _ol_math$ceil } from '../../ol/math.js';
import { clamp as _ol_math$clamp } from '../../ol/math.js';
import { floor as _ol_math$floor } from '../../ol/math.js';
import { lerp as _ol_math$lerp } from '../../ol/math.js';
import { modulo as _ol_math$modulo } from '../../ol/math.js';
import { round as _ol_math$round } from '../../ol/math.js';
import { solveLinearSystem as _ol_math$solveLinearSystem } from '../../ol/math.js';
import { squaredDistance as _ol_math$squaredDistance } from '../../ol/math.js';
import { squaredSegmentDistance as _ol_math$squaredSegmentDistance } from '../../ol/math.js';
import { toDegrees as _ol_math$toDegrees } from '../../ol/math.js';
import { toFixed as _ol_math$toFixed } from '../../ol/math.js';
import { toRadians as _ol_math$toRadians } from '../../ol/math.js';
import { ClientError as _ol_net$ClientError } from '../../ol/net.js';
import { ResponseError as _ol_net$ResponseError } from '../../ol/net.js';
import { getJSON as _ol_net$getJSON } from '../../ol/net.js';
import { jsonp as _ol_net$jsonp } from '../../ol/net.js';
import { overrideXHR as _ol_net$overrideXHR } from '../../ol/net.js';
import { resolveUrl as _ol_net$resolveUrl } from '../../ol/net.js';
import { restoreXHR as _ol_net$restoreXHR } from '../../ol/net.js';
import { clear as _ol_obj$clear } from '../../ol/obj.js';
import { isEmpty as _ol_obj$isEmpty } from '../../ol/obj.js';
import $ol$proj$Projection from '../../ol/proj/Projection.js';
import { METERS_PER_UNIT as _ol_proj_Units$METERS_PER_UNIT } from '../../ol/proj/Units.js';
import { fromCode as _ol_proj_Units$fromCode } from '../../ol/proj/Units.js';
import { addCommon as _ol_proj$addCommon } from '../../ol/proj.js';
import { addCoordinateTransforms as _ol_proj$addCoordinateTransforms } from '../../ol/proj.js';
import { addEquivalentProjections as _ol_proj$addEquivalentProjections } from '../../ol/proj.js';
import { addEquivalentTransforms as _ol_proj$addEquivalentTransforms } from '../../ol/proj.js';
import { addProjection as _ol_proj$addProjection } from '../../ol/proj.js';
import { addProjections as _ol_proj$addProjections } from '../../ol/proj.js';
import { clearAllProjections as _ol_proj$clearAllProjections } from '../../ol/proj.js';
import { clearUserProjection as _ol_proj$clearUserProjection } from '../../ol/proj.js';
import { cloneTransform as _ol_proj$cloneTransform } from '../../ol/proj.js';
import { createProjection as _ol_proj$createProjection } from '../../ol/proj.js';
import { createSafeCoordinateTransform as _ol_proj$createSafeCoordinateTransform } from '../../ol/proj.js';
import { createTransformFromCoordinateTransform as _ol_proj$createTransformFromCoordinateTransform } from '../../ol/proj.js';
import { disableCoordinateWarning as _ol_proj$disableCoordinateWarning } from '../../ol/proj.js';
import { EXTENT as _ol_proj_epsg3857$EXTENT } from '../../ol/proj/epsg3857.js';
import { HALF_SIZE as _ol_proj_epsg3857$HALF_SIZE } from '../../ol/proj/epsg3857.js';
import { MAX_SAFE_Y as _ol_proj_epsg3857$MAX_SAFE_Y } from '../../ol/proj/epsg3857.js';
import { PROJECTIONS as _ol_proj_epsg3857$PROJECTIONS } from '../../ol/proj/epsg3857.js';
import { RADIUS as _ol_proj_epsg3857$RADIUS } from '../../ol/proj/epsg3857.js';
import { WORLD_EXTENT as _ol_proj_epsg3857$WORLD_EXTENT } from '../../ol/proj/epsg3857.js';
import { fromEPSG4326 as _ol_proj_epsg3857$fromEPSG4326 } from '../../ol/proj/epsg3857.js';
import { toEPSG4326 as _ol_proj_epsg3857$toEPSG4326 } from '../../ol/proj/epsg3857.js';
import { EXTENT as _ol_proj_epsg4326$EXTENT } from '../../ol/proj/epsg4326.js';
import { METERS_PER_UNIT as _ol_proj_epsg4326$METERS_PER_UNIT } from '../../ol/proj/epsg4326.js';
import { PROJECTIONS as _ol_proj_epsg4326$PROJECTIONS } from '../../ol/proj/epsg4326.js';
import { RADIUS as _ol_proj_epsg4326$RADIUS } from '../../ol/proj/epsg4326.js';
import { equivalent as _ol_proj$equivalent } from '../../ol/proj.js';
import { fromLonLat as _ol_proj$fromLonLat } from '../../ol/proj.js';
import { fromUserCoordinate as _ol_proj$fromUserCoordinate } from '../../ol/proj.js';
import { fromUserExtent as _ol_proj$fromUserExtent } from '../../ol/proj.js';
import { fromUserResolution as _ol_proj$fromUserResolution } from '../../ol/proj.js';
import { get as _ol_proj$get } from '../../ol/proj.js';
import { getPointResolution as _ol_proj$getPointResolution } from '../../ol/proj.js';
import { getTransform as _ol_proj$getTransform } from '../../ol/proj.js';
import { getTransformFromProjections as _ol_proj$getTransformFromProjections } from '../../ol/proj.js';
import { getUserProjection as _ol_proj$getUserProjection } from '../../ol/proj.js';
import { identityTransform as _ol_proj$identityTransform } from '../../ol/proj.js';
import { epsgLookupMapTiler as _ol_proj_proj4$epsgLookupMapTiler } from '../../ol/proj/proj4.js';
import { fromEPSGCode as _ol_proj_proj4$fromEPSGCode } from '../../ol/proj/proj4.js';
import { getEPSGLookup as _ol_proj_proj4$getEPSGLookup } from '../../ol/proj/proj4.js';
import { isRegistered as _ol_proj_proj4$isRegistered } from '../../ol/proj/proj4.js';
import { register as _ol_proj_proj4$register } from '../../ol/proj/proj4.js';
import { setEPSGLookup as _ol_proj_proj4$setEPSGLookup } from '../../ol/proj/proj4.js';
import { unregister as _ol_proj_proj4$unregister } from '../../ol/proj/proj4.js';
import { add as _ol_proj_projections$add } from '../../ol/proj/projections.js';
import { clear as _ol_proj_projections$clear } from '../../ol/proj/projections.js';
import { get as _ol_proj_projections$get } from '../../ol/proj/projections.js';
import { setUserProjection as _ol_proj$setUserProjection } from '../../ol/proj.js';
import { toLonLat as _ol_proj$toLonLat } from '../../ol/proj.js';
import { toUserCoordinate as _ol_proj$toUserCoordinate } from '../../ol/proj.js';
import { toUserExtent as _ol_proj$toUserExtent } from '../../ol/proj.js';
import { toUserResolution as _ol_proj$toUserResolution } from '../../ol/proj.js';
import { transform as _ol_proj$transform } from '../../ol/proj.js';
import { transformExtent as _ol_proj$transformExtent } from '../../ol/proj.js';
import { transformWithProjections as _ol_proj$transformWithProjections } from '../../ol/proj.js';
import { add as _ol_proj_transforms$add } from '../../ol/proj/transforms.js';
import { clear as _ol_proj_transforms$clear } from '../../ol/proj/transforms.js';
import { get as _ol_proj_transforms$get } from '../../ol/proj/transforms.js';
import { remove as _ol_proj_transforms$remove } from '../../ol/proj/transforms.js';
import { useGeographic as _ol_proj$useGeographic } from '../../ol/proj.js';
import $ol$render$Box from '../../ol/render/Box.js';
import $ol$render$Event from '../../ol/render/Event.js';
import $ol$render$Feature from '../../ol/render/Feature.js';
import $ol$render$VectorContext from '../../ol/render/VectorContext.js';
import $ol$render$canvas$Builder from '../../ol/render/canvas/Builder.js';
import $ol$render$canvas$BuilderGroup from '../../ol/render/canvas/BuilderGroup.js';
import $ol$render$canvas$Executor from '../../ol/render/canvas/Executor.js';
import $ol$render$canvas$ExecutorGroup from '../../ol/render/canvas/ExecutorGroup.js';
import $ol$render$canvas$ImageBuilder from '../../ol/render/canvas/ImageBuilder.js';
import $ol$render$canvas$Immediate from '../../ol/render/canvas/Immediate.js';
import { beginPathInstruction as _ol_render_canvas_Instruction$beginPathInstruction } from '../../ol/render/canvas/Instruction.js';
import { closePathInstruction as _ol_render_canvas_Instruction$closePathInstruction } from '../../ol/render/canvas/Instruction.js';
import { fillInstruction as _ol_render_canvas_Instruction$fillInstruction } from '../../ol/render/canvas/Instruction.js';
import { strokeInstruction as _ol_render_canvas_Instruction$strokeInstruction } from '../../ol/render/canvas/Instruction.js';
import $ol$render$canvas$LineStringBuilder from '../../ol/render/canvas/LineStringBuilder.js';
import $ol$render$canvas$PolygonBuilder from '../../ol/render/canvas/PolygonBuilder.js';
import $ol$render$canvas$TextBuilder from '../../ol/render/canvas/TextBuilder.js';
import $ol$render$canvas$ZIndexContext from '../../ol/render/canvas/ZIndexContext.js';
import { checkedFonts as _ol_render_canvas$checkedFonts } from '../../ol/render/canvas.js';
import { defaultFillStyle as _ol_render_canvas$defaultFillStyle } from '../../ol/render/canvas.js';
import { defaultFont as _ol_render_canvas$defaultFont } from '../../ol/render/canvas.js';
import { defaultLineCap as _ol_render_canvas$defaultLineCap } from '../../ol/render/canvas.js';
import { defaultLineDash as _ol_render_canvas$defaultLineDash } from '../../ol/render/canvas.js';
import { defaultLineDashOffset as _ol_render_canvas$defaultLineDashOffset } from '../../ol/render/canvas.js';
import { defaultLineJoin as _ol_render_canvas$defaultLineJoin } from '../../ol/render/canvas.js';
import { defaultLineWidth as _ol_render_canvas$defaultLineWidth } from '../../ol/render/canvas.js';
import { defaultMiterLimit as _ol_render_canvas$defaultMiterLimit } from '../../ol/render/canvas.js';
import { defaultPadding as _ol_render_canvas$defaultPadding } from '../../ol/render/canvas.js';
import { defaultStrokeStyle as _ol_render_canvas$defaultStrokeStyle } from '../../ol/render/canvas.js';
import { defaultTextAlign as _ol_render_canvas$defaultTextAlign } from '../../ol/render/canvas.js';
import { defaultTextBaseline as _ol_render_canvas$defaultTextBaseline } from '../../ol/render/canvas.js';
import { drawImageOrLabel as _ol_render_canvas$drawImageOrLabel } from '../../ol/render/canvas.js';
import { getTextDimensions as _ol_render_canvas$getTextDimensions } from '../../ol/render/canvas.js';
import { HIT_DETECT_RESOLUTION as _ol_render_canvas_hitdetect$HIT_DETECT_RESOLUTION } from '../../ol/render/canvas/hitdetect.js';
import { createHitDetectionImageData as _ol_render_canvas_hitdetect$createHitDetectionImageData } from '../../ol/render/canvas/hitdetect.js';
import { hitDetect as _ol_render_canvas_hitdetect$hitDetect } from '../../ol/render/canvas/hitdetect.js';
import { measureAndCacheTextWidth as _ol_render_canvas$measureAndCacheTextWidth } from '../../ol/render/canvas.js';
import { measureTextHeight as _ol_render_canvas$measureTextHeight } from '../../ol/render/canvas.js';
import { measureTextWidth as _ol_render_canvas$measureTextWidth } from '../../ol/render/canvas.js';
import { registerFont as _ol_render_canvas$registerFont } from '../../ol/render/canvas.js';
import { rotateAtOffset as _ol_render_canvas$rotateAtOffset } from '../../ol/render/canvas.js';
import { buildRuleSet as _ol_render_canvas_style$buildRuleSet } from '../../ol/render/canvas/style.js';
import { buildStyle as _ol_render_canvas_style$buildStyle } from '../../ol/render/canvas/style.js';
import { flatStylesToStyleFunction as _ol_render_canvas_style$flatStylesToStyleFunction } from '../../ol/render/canvas/style.js';
import { rulesToStyleFunction as _ol_render_canvas_style$rulesToStyleFunction } from '../../ol/render/canvas/style.js';
import { textHeights as _ol_render_canvas$textHeights } from '../../ol/render/canvas.js';
import { getRenderPixel as _ol_render$getRenderPixel } from '../../ol/render.js';
import { getVectorContext as _ol_render$getVectorContext } from '../../ol/render.js';
import { toContext as _ol_render$toContext } from '../../ol/render.js';
import $ol$render$webgl$MixedGeometryBatch from '../../ol/render/webgl/MixedGeometryBatch.js';
import $ol$render$webgl$VectorStyleRenderer from '../../ol/render/webgl/VectorStyleRenderer.js';
import { generateLineStringRenderInstructions as _ol_render_webgl_renderinstructions$generateLineStringRenderInstructions } from '../../ol/render/webgl/renderinstructions.js';
import { generatePointRenderInstructions as _ol_render_webgl_renderinstructions$generatePointRenderInstructions } from '../../ol/render/webgl/renderinstructions.js';
import { generatePolygonRenderInstructions as _ol_render_webgl_renderinstructions$generatePolygonRenderInstructions } from '../../ol/render/webgl/renderinstructions.js';
import { getCustomAttributesSize as _ol_render_webgl_renderinstructions$getCustomAttributesSize } from '../../ol/render/webgl/renderinstructions.js';
import { LINESTRING_ANGLE_COSINE_CUTOFF as _ol_render_webgl_utils$LINESTRING_ANGLE_COSINE_CUTOFF } from '../../ol/render/webgl/utils.js';
import { colorDecodeId as _ol_render_webgl_utils$colorDecodeId } from '../../ol/render/webgl/utils.js';
import { colorEncodeId as _ol_render_webgl_utils$colorEncodeId } from '../../ol/render/webgl/utils.js';
import { getBlankImageData as _ol_render_webgl_utils$getBlankImageData } from '../../ol/render/webgl/utils.js';
import { writeLineSegmentToBuffers as _ol_render_webgl_utils$writeLineSegmentToBuffers } from '../../ol/render/webgl/utils.js';
import { writePointFeatureToBuffers as _ol_render_webgl_utils$writePointFeatureToBuffers } from '../../ol/render/webgl/utils.js';
import { writePolygonTrianglesToBuffers as _ol_render_webgl_utils$writePolygonTrianglesToBuffers } from '../../ol/render/webgl/utils.js';
import $ol$renderer$Composite from '../../ol/renderer/Composite.js';
import $ol$renderer$Layer from '../../ol/renderer/Layer.js';
import $ol$renderer$Map from '../../ol/renderer/Map.js';
import $ol$renderer$canvas$ImageLayer from '../../ol/renderer/canvas/ImageLayer.js';
import $ol$renderer$canvas$Layer from '../../ol/renderer/canvas/Layer.js';
import $ol$renderer$canvas$TileLayer from '../../ol/renderer/canvas/TileLayer.js';
import $ol$renderer$canvas$VectorImageLayer from '../../ol/renderer/canvas/VectorImageLayer.js';
import $ol$renderer$canvas$VectorLayer from '../../ol/renderer/canvas/VectorLayer.js';
import $ol$renderer$canvas$VectorTileLayer from '../../ol/renderer/canvas/VectorTileLayer.js';
import { defaultOrder as _ol_renderer_vector$defaultOrder } from '../../ol/renderer/vector.js';
import { getSquaredTolerance as _ol_renderer_vector$getSquaredTolerance } from '../../ol/renderer/vector.js';
import { getTolerance as _ol_renderer_vector$getTolerance } from '../../ol/renderer/vector.js';
import { renderFeature as _ol_renderer_vector$renderFeature } from '../../ol/renderer/vector.js';
import $ol$renderer$webgl$FlowLayer from '../../ol/renderer/webgl/FlowLayer.js';
import $ol$renderer$webgl$Layer from '../../ol/renderer/webgl/Layer.js';
import $ol$renderer$webgl$PointsLayer from '../../ol/renderer/webgl/PointsLayer.js';
import $ol$renderer$webgl$TileLayer from '../../ol/renderer/webgl/TileLayer.js';
import $ol$renderer$webgl$TileLayerBase from '../../ol/renderer/webgl/TileLayerBase.js';
import $ol$renderer$webgl$VectorLayer from '../../ol/renderer/webgl/VectorLayer.js';
import $ol$renderer$webgl$VectorTileLayer from '../../ol/renderer/webgl/VectorTileLayer.js';
import $ol$reproj$DataTile from '../../ol/reproj/DataTile.js';
import $ol$reproj$Image from '../../ol/reproj/Image.js';
import $ol$reproj$Tile from '../../ol/reproj/Tile.js';
import $ol$reproj$Triangulation from '../../ol/reproj/Triangulation.js';
import { calculateSourceExtentResolution as _ol_reproj$calculateSourceExtentResolution } from '../../ol/reproj.js';
import { calculateSourceResolution as _ol_reproj$calculateSourceResolution } from '../../ol/reproj.js';
import { canvasPool as _ol_reproj$canvasPool } from '../../ol/reproj.js';
import { ERROR_THRESHOLD as _ol_reproj_common$ERROR_THRESHOLD } from '../../ol/reproj/common.js';
import { render as _ol_reproj$render } from '../../ol/reproj.js';
import { fromResolutionLike as _ol_resolution$fromResolutionLike } from '../../ol/resolution.js';
import { createMinMaxResolution as _ol_resolutionconstraint$createMinMaxResolution } from '../../ol/resolutionconstraint.js';
import { createSnapToPower as _ol_resolutionconstraint$createSnapToPower } from '../../ol/resolutionconstraint.js';
import { createSnapToResolutions as _ol_resolutionconstraint$createSnapToResolutions } from '../../ol/resolutionconstraint.js';
import { createSnapToN as _ol_rotationconstraint$createSnapToN } from '../../ol/rotationconstraint.js';
import { createSnapToZero as _ol_rotationconstraint$createSnapToZero } from '../../ol/rotationconstraint.js';
import { disable as _ol_rotationconstraint$disable } from '../../ol/rotationconstraint.js';
import { none as _ol_rotationconstraint$none } from '../../ol/rotationconstraint.js';
import { buffer as _ol_size$buffer } from '../../ol/size.js';
import { hasArea as _ol_size$hasArea } from '../../ol/size.js';
import { scale as _ol_size$scale } from '../../ol/size.js';
import { toSize as _ol_size$toSize } from '../../ol/size.js';
import $ol$source$BingMaps from '../../ol/source/BingMaps.js';
import $ol$source$CartoDB from '../../ol/source/CartoDB.js';
import $ol$source$Cluster from '../../ol/source/Cluster.js';
import $ol$source$DataTile from '../../ol/source/DataTile.js';
import $ol$source$GeoTIFF from '../../ol/source/GeoTIFF.js';
import $ol$source$Google from '../../ol/source/Google.js';
import $ol$source$IIIF from '../../ol/source/IIIF.js';
import $ol$source$Image from '../../ol/source/Image.js';
import $ol$source$ImageArcGISRest from '../../ol/source/ImageArcGISRest.js';
import $ol$source$ImageCanvas from '../../ol/source/ImageCanvas.js';
import $ol$source$ImageMapGuide from '../../ol/source/ImageMapGuide.js';
import $ol$source$ImageStatic from '../../ol/source/ImageStatic.js';
import $ol$source$ImageTile from '../../ol/source/ImageTile.js';
import $ol$source$ImageWMS from '../../ol/source/ImageWMS.js';
import $ol$source$OGCMapTile from '../../ol/source/OGCMapTile.js';
import $ol$source$OGCVectorTile from '../../ol/source/OGCVectorTile.js';
import $ol$source$OSM from '../../ol/source/OSM.js';
import $ol$source$Raster from '../../ol/source/Raster.js';
import $ol$source$Source from '../../ol/source/Source.js';
import $ol$source$StadiaMaps from '../../ol/source/StadiaMaps.js';
import $ol$source$Tile from '../../ol/source/Tile.js';
import $ol$source$TileArcGISRest from '../../ol/source/TileArcGISRest.js';
import $ol$source$TileDebug from '../../ol/source/TileDebug.js';
import $ol$source$TileImage from '../../ol/source/TileImage.js';
import $ol$source$TileJSON from '../../ol/source/TileJSON.js';
import $ol$source$TileWMS from '../../ol/source/TileWMS.js';
import $ol$source$UTFGrid from '../../ol/source/UTFGrid.js';
import $ol$source$UrlTile from '../../ol/source/UrlTile.js';
import $ol$source$Vector from '../../ol/source/Vector.js';
import $ol$source$VectorTile from '../../ol/source/VectorTile.js';
import $ol$source$WMTS from '../../ol/source/WMTS.js';
import $ol$source$XYZ from '../../ol/source/XYZ.js';
import $ol$source$Zoomify from '../../ol/source/Zoomify.js';
import { createLoader as _ol_source_arcgisRest$createLoader } from '../../ol/source/arcgisRest.js';
import { getRequestUrl as _ol_source_arcgisRest$getRequestUrl } from '../../ol/source/arcgisRest.js';
import { DECIMALS as _ol_source_common$DECIMALS } from '../../ol/source/common.js';
import { DEFAULT_WMS_VERSION as _ol_source_common$DEFAULT_WMS_VERSION } from '../../ol/source/common.js';
import { createLoader as _ol_source_mapguide$createLoader } from '../../ol/source/mapguide.js';
import { appendCollectionsQueryParam as _ol_source_ogcTileUtil$appendCollectionsQueryParam } from '../../ol/source/ogcTileUtil.js';
import { getMapTileUrlTemplate as _ol_source_ogcTileUtil$getMapTileUrlTemplate } from '../../ol/source/ogcTileUtil.js';
import { getTileSetInfo as _ol_source_ogcTileUtil$getTileSetInfo } from '../../ol/source/ogcTileUtil.js';
import { getVectorTileUrlTemplate as _ol_source_ogcTileUtil$getVectorTileUrlTemplate } from '../../ol/source/ogcTileUtil.js';
import { sourcesFromTileGrid as _ol_source$sourcesFromTileGrid } from '../../ol/source.js';
import { createLoader as _ol_source_static$createLoader } from '../../ol/source/static.js';
import { DEFAULT_VERSION as _ol_source_wms$DEFAULT_VERSION } from '../../ol/source/wms.js';
import { createLoader as _ol_source_wms$createLoader } from '../../ol/source/wms.js';
import { getFeatureInfoUrl as _ol_source_wms$getFeatureInfoUrl } from '../../ol/source/wms.js';
import { getImageSrc as _ol_source_wms$getImageSrc } from '../../ol/source/wms.js';
import { getLegendUrl as _ol_source_wms$getLegendUrl } from '../../ol/source/wms.js';
import { getRequestParams as _ol_source_wms$getRequestParams } from '../../ol/source/wms.js';
import { getRequestUrl as _ol_source_wms$getRequestUrl } from '../../ol/source/wms.js';
import { DEFAULT_RADIUS as _ol_sphere$DEFAULT_RADIUS } from '../../ol/sphere.js';
import { getArea as _ol_sphere$getArea } from '../../ol/sphere.js';
import { getDistance as _ol_sphere$getDistance } from '../../ol/sphere.js';
import { getLength as _ol_sphere$getLength } from '../../ol/sphere.js';
import { offset as _ol_sphere$offset } from '../../ol/sphere.js';
import { compareVersions as _ol_string$compareVersions } from '../../ol/string.js';
import { padNumber as _ol_string$padNumber } from '../../ol/string.js';
import $ol$structs$LRUCache from '../../ol/structs/LRUCache.js';
import $ol$structs$PriorityQueue from '../../ol/structs/PriorityQueue.js';
import $ol$structs$RBush from '../../ol/structs/RBush.js';
import $ol$style$Circle from '../../ol/style/Circle.js';
import $ol$style$Fill from '../../ol/style/Fill.js';
import $ol$style$Icon from '../../ol/style/Icon.js';
import $ol$style$IconImage from '../../ol/style/IconImage.js';
import $ol$style$IconImageCache from '../../ol/style/IconImageCache.js';
import $ol$style$Image from '../../ol/style/Image.js';
import $ol$style$RegularShape from '../../ol/style/RegularShape.js';
import $ol$style$Stroke from '../../ol/style/Stroke.js';
import $ol$style$Style from '../../ol/style/Style.js';
import $ol$style$Text from '../../ol/style/Text.js';
import { createDefaultStyle as _ol_style_flat$createDefaultStyle } from '../../ol/style/flat.js';
import { createOrUpdate as _ol_tilecoord$createOrUpdate } from '../../ol/tilecoord.js';
import { fromKey as _ol_tilecoord$fromKey } from '../../ol/tilecoord.js';
import { getCacheKeyForTileKey as _ol_tilecoord$getCacheKeyForTileKey } from '../../ol/tilecoord.js';
import { getKey as _ol_tilecoord$getKey } from '../../ol/tilecoord.js';
import { getKeyZXY as _ol_tilecoord$getKeyZXY } from '../../ol/tilecoord.js';
import { hash as _ol_tilecoord$hash } from '../../ol/tilecoord.js';
import { hashZXY as _ol_tilecoord$hashZXY } from '../../ol/tilecoord.js';
import { withinExtentAndZ as _ol_tilecoord$withinExtentAndZ } from '../../ol/tilecoord.js';
import $ol$tilegrid$TileGrid from '../../ol/tilegrid/TileGrid.js';
import $ol$tilegrid$WMTS from '../../ol/tilegrid/WMTS.js';
import { DEFAULT_MAX_ZOOM as _ol_tilegrid_common$DEFAULT_MAX_ZOOM } from '../../ol/tilegrid/common.js';
import { DEFAULT_TILE_SIZE as _ol_tilegrid_common$DEFAULT_TILE_SIZE } from '../../ol/tilegrid/common.js';
import { createForExtent as _ol_tilegrid$createForExtent } from '../../ol/tilegrid.js';
import { createForProjection as _ol_tilegrid$createForProjection } from '../../ol/tilegrid.js';
import { createXYZ as _ol_tilegrid$createXYZ } from '../../ol/tilegrid.js';
import { extentFromProjection as _ol_tilegrid$extentFromProjection } from '../../ol/tilegrid.js';
import { getForProjection as _ol_tilegrid$getForProjection } from '../../ol/tilegrid.js';
import { wrapX as _ol_tilegrid$wrapX } from '../../ol/tilegrid.js';
import { createFromTemplate as _ol_tileurlfunction$createFromTemplate } from '../../ol/tileurlfunction.js';
import { createFromTemplates as _ol_tileurlfunction$createFromTemplates } from '../../ol/tileurlfunction.js';
import { createFromTileUrlFunctions as _ol_tileurlfunction$createFromTileUrlFunctions } from '../../ol/tileurlfunction.js';
import { nullTileUrlFunction as _ol_tileurlfunction$nullTileUrlFunction } from '../../ol/tileurlfunction.js';
import { apply as _ol_transform$apply } from '../../ol/transform.js';
import { compose as _ol_transform$compose } from '../../ol/transform.js';
import { composeCssTransform as _ol_transform$composeCssTransform } from '../../ol/transform.js';
import { create as _ol_transform$create } from '../../ol/transform.js';
import { determinant as _ol_transform$determinant } from '../../ol/transform.js';
import { invert as _ol_transform$invert } from '../../ol/transform.js';
import { makeInverse as _ol_transform$makeInverse } from '../../ol/transform.js';
import { makeScale as _ol_transform$makeScale } from '../../ol/transform.js';
import { multiply as _ol_transform$multiply } from '../../ol/transform.js';
import { reset as _ol_transform$reset } from '../../ol/transform.js';
import { rotate as _ol_transform$rotate } from '../../ol/transform.js';
import { scale as _ol_transform$scale } from '../../ol/transform.js';
import { set as _ol_transform$set } from '../../ol/transform.js';
import { setFromArray as _ol_transform$setFromArray } from '../../ol/transform.js';
import { toString as _ol_transform$toString } from '../../ol/transform.js';
import { translate as _ol_transform$translate } from '../../ol/transform.js';
import { appendParams as _ol_uri$appendParams } from '../../ol/uri.js';
import { expandUrl as _ol_uri$expandUrl } from '../../ol/uri.js';
import { pickUrl as _ol_uri$pickUrl } from '../../ol/uri.js';
import { renderXYZTemplate as _ol_uri$renderXYZTemplate } from '../../ol/uri.js';
import { VERSION as _ol_util$VERSION } from '../../ol/util.js';
import { abstract as _ol_util$abstract } from '../../ol/util.js';
import { getUid as _ol_util$getUid } from '../../ol/util.js';
import { create as _ol_vec_mat4$create } from '../../ol/vec/mat4.js';
import { fromTransform as _ol_vec_mat4$fromTransform } from '../../ol/vec/mat4.js';
import { ARRAY_BUFFER as _ol_webgl$ARRAY_BUFFER } from '../../ol/webgl.js';
import $ol$webgl$BaseTileRepresentation from '../../ol/webgl/BaseTileRepresentation.js';
import $ol$webgl$Buffer from '../../ol/webgl/Buffer.js';
import { DYNAMIC_DRAW as _ol_webgl$DYNAMIC_DRAW } from '../../ol/webgl.js';
import { ELEMENT_ARRAY_BUFFER as _ol_webgl$ELEMENT_ARRAY_BUFFER } from '../../ol/webgl.js';
import { FLOAT as _ol_webgl$FLOAT } from '../../ol/webgl.js';
import $ol$webgl$Helper from '../../ol/webgl/Helper.js';
import $ol$webgl$PaletteTexture from '../../ol/webgl/PaletteTexture.js';
import $ol$webgl$PostProcessingPass from '../../ol/webgl/PostProcessingPass.js';
import $ol$webgl$RenderTarget from '../../ol/webgl/RenderTarget.js';
import { STATIC_DRAW as _ol_webgl$STATIC_DRAW } from '../../ol/webgl.js';
import { STREAM_DRAW as _ol_webgl$STREAM_DRAW } from '../../ol/webgl.js';
import { COMMON_HEADER as _ol_webgl_ShaderBuilder$COMMON_HEADER } from '../../ol/webgl/ShaderBuilder.js';
import { ShaderBuilder as _ol_webgl_ShaderBuilder$ShaderBuilder } from '../../ol/webgl/ShaderBuilder.js';
import $ol$webgl$TileGeometry from '../../ol/webgl/TileGeometry.js';
import $ol$webgl$TileTexture from '../../ol/webgl/TileTexture.js';
import { UNSIGNED_BYTE as _ol_webgl$UNSIGNED_BYTE } from '../../ol/webgl.js';
import { UNSIGNED_INT as _ol_webgl$UNSIGNED_INT } from '../../ol/webgl.js';
import { UNSIGNED_SHORT as _ol_webgl$UNSIGNED_SHORT } from '../../ol/webgl.js';
import { getContext as _ol_webgl$getContext } from '../../ol/webgl.js';
import { getSupportedExtensions as _ol_webgl$getSupportedExtensions } from '../../ol/webgl.js';
import { computeHash as _ol_webgl_styleparser$computeHash } from '../../ol/webgl/styleparser.js';
import { expressionToGlsl as _ol_webgl_styleparser$expressionToGlsl } from '../../ol/webgl/styleparser.js';
import { packColor as _ol_webgl_styleparser$packColor } from '../../ol/webgl/styleparser.js';
import { parseLiteralStyle as _ol_webgl_styleparser$parseLiteralStyle } from '../../ol/webgl/styleparser.js';
import { OBJECT_PROPERTY_NODE_FACTORY as _ol_xml$OBJECT_PROPERTY_NODE_FACTORY } from '../../ol/xml.js';
import { XML_SCHEMA_INSTANCE_URI as _ol_xml$XML_SCHEMA_INSTANCE_URI } from '../../ol/xml.js';
import { createElementNS as _ol_xml$createElementNS } from '../../ol/xml.js';
import { getAllTextContent as _ol_xml$getAllTextContent } from '../../ol/xml.js';
import { getAllTextContent_ as _ol_xml$getAllTextContent_ } from '../../ol/xml.js';
import { getAttributeNS as _ol_xml$getAttributeNS } from '../../ol/xml.js';
import { getDocument as _ol_xml$getDocument } from '../../ol/xml.js';
import { getXMLSerializer as _ol_xml$getXMLSerializer } from '../../ol/xml.js';
import { isDocument as _ol_xml$isDocument } from '../../ol/xml.js';
import { makeArrayExtender as _ol_xml$makeArrayExtender } from '../../ol/xml.js';
import { makeArrayPusher as _ol_xml$makeArrayPusher } from '../../ol/xml.js';
import { makeArraySerializer as _ol_xml$makeArraySerializer } from '../../ol/xml.js';
import { makeChildAppender as _ol_xml$makeChildAppender } from '../../ol/xml.js';
import { makeObjectPropertyPusher as _ol_xml$makeObjectPropertyPusher } from '../../ol/xml.js';
import { makeObjectPropertySetter as _ol_xml$makeObjectPropertySetter } from '../../ol/xml.js';
import { makeReplacer as _ol_xml$makeReplacer } from '../../ol/xml.js';
import { makeSequence as _ol_xml$makeSequence } from '../../ol/xml.js';
import { makeSimpleNodeFactory as _ol_xml$makeSimpleNodeFactory } from '../../ol/xml.js';
import { makeStructureNS as _ol_xml$makeStructureNS } from '../../ol/xml.js';
import { parse as _ol_xml$parse } from '../../ol/xml.js';
import { parseNode as _ol_xml$parseNode } from '../../ol/xml.js';
import { pushParseAndPop as _ol_xml$pushParseAndPop } from '../../ol/xml.js';
import { pushSerializeAndPop as _ol_xml$pushSerializeAndPop } from '../../ol/xml.js';
import { registerDocument as _ol_xml$registerDocument } from '../../ol/xml.js';
import { registerXMLSerializer as _ol_xml$registerXMLSerializer } from '../../ol/xml.js';
import { serialize as _ol_xml$serialize } from '../../ol/xml.js';
//# sourceMappingURL=ol.d.ts.map