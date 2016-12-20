jest.dontMock('../ModalLink.jsx');
jest.dontMock('../Modal.jsx');

describe('ModalLink', function () {
  var React = require('react/addons');
  var ModalLink = require('../ModalLink.jsx');
  var Modal = require('../Modal.jsx');
  var TestUtils = React.addons.TestUtils;

  var MyModal = React.createClass({
    render: function () {
      return (
        <Modal {...this.props}>
          <header>Modal</header>
          <p>{this.props.something}</p>
        </Modal>
      );
    }
  });

  var modalLink = (
    <ModalLink modal={<MyModal something="anything"/>}>
      <a>Open modal</a>
    </ModalLink>
  );

  it('should add onClick-prop to the child', function () {
    var renderedModalLink = TestUtils.renderIntoDocument(modalLink);
    var renderedTrigger = TestUtils.findRenderedDOMComponentWithTag(renderedModalLink, "a");
    expect(renderedTrigger.props.onClick).toBeDefined();
  });

  it('should add onHide-prop to the modal', function () {
    var renderedModalLink = TestUtils.renderIntoDocument(modalLink);
    var renderedModal = TestUtils.findRenderedComponentWithType(renderedModalLink, <MyModal />);
    expect(renderedModal.props.onHide).toBeDefined();
  });
});
