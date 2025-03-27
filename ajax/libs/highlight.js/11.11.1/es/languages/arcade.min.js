/*! `arcade` grammar compiled for Highlight.js 11.11.1 */
var hljsGrammar=(()=>{"use strict";return e=>{
const t="[A-Za-z_][0-9A-Za-z_]*",n={
keyword:["break","case","catch","continue","debugger","do","else","export","for","function","if","import","in","new","of","return","switch","try","var","void","while"],
literal:["BackSlash","DoubleQuote","ForwardSlash","Infinity","NaN","NewLine","PI","SingleQuote","Tab","TextFormatting","false","null","true","undefined"],
built_in:["Abs","Acos","All","Angle","Any","Area","AreaGeodetic","Array","Asin","Atan","Atan2","Attachments","Average","Back","Bearing","Boolean","Buffer","BufferGeodetic","Ceil","Centroid","ChangeTimeZone","Clip","Concatenate","Console","Constrain","Contains","ConvertDirection","ConvexHull","Cos","Count","Crosses","Cut","Date|0","DateAdd","DateDiff","DateOnly","Day","Decode","DefaultValue","Densify","DensifyGeodetic","Dictionary","Difference","Disjoint","Distance","DistanceGeodetic","DistanceToCoordinate","Distinct","Domain","DomainCode","DomainName","EnvelopeIntersects","Equals","Erase","Exp","Expects","Extent","Feature","FeatureInFilter","FeatureSet","FeatureSetByAssociation","FeatureSetById","FeatureSetByName","FeatureSetByPortalItem","FeatureSetByRelationshipClass","FeatureSetByRelationshipName","Filter","FilterBySubtypeCode","Find","First|0","Floor","FromCharCode","FromCodePoint","FromJSON","Front","GdbVersion","Generalize","Geometry","GetEnvironment","GetFeatureSet","GetFeatureSetInfo","GetUser","GroupBy","Guid","HasKey","HasValue","Hash","Hour","IIf","ISOMonth","ISOWeek","ISOWeekday","ISOYear","Includes","IndexOf","Insert","Intersection","Intersects","IsEmpty","IsNan","IsSelfIntersecting","IsSimple","KnowledgeGraphByPortalItem","Left|0","Length","Length3D","LengthGeodetic","Log","Lower","Map","Max","Mean","MeasureToCoordinate","Mid","Millisecond","Min","Minute","Month","MultiPartToSinglePart","Multipoint","NearestCoordinate","NearestVertex","NextSequenceValue","None","Now","Number","Offset","OrderBy","Overlaps","Point","PointToCoordinate","Polygon","Polyline","Pop","Portal","Pow","Proper","Push","QueryGraph","Random","Reduce","Relate","Replace","Resize","Reverse","Right|0","RingIsClockwise","Rotate","Round","Schema","Second","SetGeometry","Simplify","Sin","Slice","Sort","Splice","Split","Sqrt","StandardizeFilename","StandardizeGuid","Stdev","SubtypeCode","SubtypeName","Subtypes","Sum","SymmetricDifference","Tan","Text","Time","TimeZone","TimeZoneOffset","Timestamp","ToCharCode","ToCodePoint","ToHex","ToLocal","ToUTC","Today","Top|0","Touches","TrackAccelerationAt","TrackAccelerationWindow","TrackCurrentAcceleration","TrackCurrentDistance","TrackCurrentSpeed","TrackCurrentTime","TrackDistanceAt","TrackDistanceWindow","TrackDuration","TrackFieldWindow","TrackGeometryWindow","TrackIndex","TrackSpeedAt","TrackSpeedWindow","TrackStartTime","TrackWindow","Trim","TypeOf","Union","Upper","UrlEncode","Variance","Week","Weekday","When|0","Within","Year|0"]
},a={className:"symbol",
begin:"\\$"+e.regex.either("aggregatedFeatures","analytic","config","datapoint","datastore","editcontext","feature","featureSet","feedfeature","fencefeature","fencenotificationtype","graph","join","layer","locationupdate","map","measure","measure","originalFeature","record","reference","rowindex","sourcedatastore","sourcefeature","sourcelayer","target","targetdatastore","targetfeature","targetlayer","userInput","value","variables","view")
},r={className:"number",variants:[{begin:"\\b(0[bB][01]+)"},{
begin:"\\b(0[oO][0-7]+)"},{begin:e.C_NUMBER_RE}],relevance:0},i={
className:"subst",begin:"\\$\\{",end:"\\}",keywords:n,contains:[]},o={
className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,i]}
;i.contains=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,o,r,e.REGEXP_MODE]
;const s=i.contains.concat([e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE])
;return{name:"ArcGIS Arcade",case_insensitive:!0,keywords:n,
contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,o,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,a,r,{
begin:/[{,]\s*/,relevance:0,contains:[{begin:t+"\\s*:",returnBegin:!0,
relevance:0,contains:[{className:"attr",begin:t,relevance:0}]}]},{
begin:"("+e.RE_STARTERS_RE+"|\\b(return)\\b)\\s*",keywords:"return",
contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,e.REGEXP_MODE,{
className:"function",begin:"(\\(.*?\\)|"+t+")\\s*=>",returnBegin:!0,
end:"\\s*=>",contains:[{className:"params",variants:[{begin:t},{begin:/\(\s*\)/
},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:n,contains:s}]}]
}],relevance:0},{beginKeywords:"function",end:/\{/,excludeEnd:!0,
contains:[e.inherit(e.TITLE_MODE,{className:"title.function",begin:t}),{
className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,contains:s
}],illegal:/\[|%/},{begin:/\$[(.]/}],illegal:/#(?!!)/}}})()
;export default hljsGrammar;