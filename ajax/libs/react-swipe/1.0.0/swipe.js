var React = require("react")
var Swipe = require("./vendor/swipe")

var styles = {
  container: {
    overflow: "hidden",
    visibility: "hidden",
    position: "relative"
  },

  wrapper: {
    overflow: "hidden",
    position: "relative"
  },

  child: {
    float: "left",
    width: "100%",
    position: "relative"
  }
}

module.exports = React.createClass({
  displayName: "Swipe",

  // https://github.com/thebird/Swipe#config-options
  propTypes: {
    startSlide      : React.PropTypes.number,
    speed           : React.PropTypes.number,
    auto            : React.PropTypes.number,
    continuous      : React.PropTypes.bool,
    disableScroll   : React.PropTypes.bool,
    stopPropagation : React.PropTypes.bool,
    callback        : React.PropTypes.func,
    transitionEnd   : React.PropTypes.func
  },

  componentDidMount: function() {
    this.swipe = Swipe(this.getDOMNode(), this.props)
  },

  componentWillUnmount: function() {
    this.swipe.kill()

    delete this.swipe
  },

  render: function() {
    var container = React.DOM.div(this.props,
      React.DOM.div({style: styles.wrapper},
        React.Children.map(this.props.children, function(child) {
          return React.addons.cloneWithProps(child, {style: styles.child})
        })
      )
    )

    return React.addons.cloneWithProps(container, {style: styles.container})
  }
})
