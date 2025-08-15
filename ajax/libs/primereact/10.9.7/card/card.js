this.primereact = this.primereact || {};
this.primereact.card = (function (exports, React, api, componentbase, hooks, utils) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);

    var classes = {
      root: 'p-card p-component',
      header: 'p-card-header',
      title: 'p-card-title',
      subTitle: 'p-card-subtitle',
      content: 'p-card-content',
      footer: 'p-card-footer',
      body: 'p-card-body'
    };
    var styles = "\n@layer primereact {\n    .p-card-header img {\n        width: 100%;\n    }\n}\n";
    var CardBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'Card',
        id: null,
        header: null,
        footer: null,
        title: null,
        subTitle: null,
        style: null,
        className: null,
        children: undefined
      },
      css: {
        classes: classes,
        styles: styles
      }
    });

    var Card = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
      var mergeProps = hooks.useMergeProps();
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = CardBase.getProps(inProps, context);
      var elementRef = React__namespace.useRef(ref);
      var _CardBase$setMetaData = CardBase.setMetaData({
          props: props
        }),
        ptm = _CardBase$setMetaData.ptm,
        cx = _CardBase$setMetaData.cx,
        isUnstyled = _CardBase$setMetaData.isUnstyled;
      componentbase.useHandleStyle(CardBase.css.styles, isUnstyled, {
        name: 'card'
      });
      var createHeader = function createHeader() {
        var headerProps = mergeProps({
          className: cx('header')
        }, ptm('header'));
        if (props.header) {
          return /*#__PURE__*/React__namespace.createElement("div", headerProps, utils.ObjectUtils.getJSXElement(props.header, props));
        }
        return null;
      };
      var createBody = function createBody() {
        var titleProps = mergeProps({
          className: cx('title')
        }, ptm('title'));
        var title = props.title && /*#__PURE__*/React__namespace.createElement("div", titleProps, utils.ObjectUtils.getJSXElement(props.title, props));
        var subTitleProps = mergeProps({
          className: cx('subTitle')
        }, ptm('subTitle'));
        var subTitle = props.subTitle && /*#__PURE__*/React__namespace.createElement("div", subTitleProps, utils.ObjectUtils.getJSXElement(props.subTitle, props));
        var contentProps = mergeProps({
          className: cx('content')
        }, ptm('content'));
        var children = props.children && /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children);
        var footerProps = mergeProps({
          className: cx('footer')
        }, ptm('footer'));
        var footer = props.footer && /*#__PURE__*/React__namespace.createElement("div", footerProps, utils.ObjectUtils.getJSXElement(props.footer, props));
        var bodyProps = mergeProps({
          className: cx('body')
        }, ptm('body'));
        return /*#__PURE__*/React__namespace.createElement("div", bodyProps, title, subTitle, children, footer);
      };
      React__namespace.useEffect(function () {
        utils.ObjectUtils.combinedRefs(elementRef, ref);
      }, [elementRef, ref]);
      var rootProps = mergeProps({
        id: props.id,
        ref: elementRef,
        style: props.style,
        className: utils.classNames(props.className, cx('root'))
      }, CardBase.getOtherProps(props), ptm('root'));
      var header = createHeader();
      var body = createBody();
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, header, body);
    });
    Card.displayName = 'Card';

    exports.Card = Card;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.utils);
