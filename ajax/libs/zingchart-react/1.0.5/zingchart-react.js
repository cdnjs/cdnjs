var zingchart = require('zingchart');
var React = require('react');

var Core = React.createClass({displayName: "Core",
    render : function(){
        return (
            React.createElement("div", {id: this.props.id})
        );
    },
    //Called after the render function.
    componentDidMount : function(){
        zingchart.render({
            id : this.props.id,
            width: (this.props.width || 600),
            height: (this.props.height || 400),
            data : this.props.data,
            theme : (this.props.theme) ? this.props.theme : "light"
        });
    },
    //Used to check the values being passed in to avoid unnecessary changes.
    shouldComponentUpdate : function(nextProps, nextState){
        //Lazy object comparison
        return !(JSON.stringify(nextProps.data) === JSON.stringify(this.props.data)) ;
    },
    componentWillUpdate : function(nextProps){
        zingchart.exec(this.props.id, 'setdata', {
            data : nextProps.data
        });
    },
    componentWillUnmount : function(){
        zingchart.exec(this.props.id, 'destroy');
    }
});

var Line = React.createClass({displayName: "Line",
    render : function(){
        var myConfig = {
            type: "line",
        	series : this.props.series
        };
        applyAttrs(this.props, myConfig);
        return (React.createElement(Core, {id: this.props.id, height: this.props.height, width: this.props.width, data: myConfig, theme: this.props.theme}));
    }
});

var Area = React.createClass({displayName: "Area",
    render : function(){
        var myConfig = {
            type: "area",
        	series : this.props.series
        };
        applyAttrs(this.props, myConfig);
        return (React.createElement(Core, {id: this.props.id, height: this.props.height, width: this.props.width, data: myConfig, theme: this.props.theme}));
    }
});

var Bar = React.createClass({displayName: "Bar",
    render : function(){
        var myConfig = {
            type: "bar",
        	series : this.props.series
        };
        applyAttrs(this.props, myConfig);
        return (React.createElement(Core, {id: this.props.id, height: this.props.height, width: this.props.width, data: myConfig, theme: this.props.theme}));
    }
});

var Scatter = React.createClass({displayName: "Scatter",
    render : function(){
        var myConfig = {
            type: "scatter",
        	series : this.props.series
        };
        applyAttrs(this.props, myConfig);
        return (React.createElement(Core, {id: this.props.id, height: this.props.height, width: this.props.width, data: myConfig, theme: this.props.theme}));
    }
});

var Pie = React.createClass({displayName: "Pie",
    render : function(){
        var myConfig = {
            type: "pie",
        	series : this.props.series
        };
        applyAttrs(this.props, myConfig);
        return (React.createElement(Core, {id: this.props.id, height: this.props.height, width: this.props.width, data: myConfig, theme: this.props.theme}));
    }
});

function applyAttrs(oProps, oConfig){
    if(oProps.legend && oProps.legend.toLowerCase() == "true"){
        oConfig.plotarea = oConfig.plotarea || {};
        oConfig.plotarea.marginRight = "150px";
        oConfig.legend = {
            maxItems : "4",
            overflow : "page"
        };
    }
    if(oProps.title){
        oConfig.title = {
            text : oProps.title
        }
    }
}
module.exports = {
    core : Core,
    line : Line,
    area : Area,
    bar : Bar,
    pie : Pie,
    scatter : Scatter
};
