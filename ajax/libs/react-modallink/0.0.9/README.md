# react-modallink
Creates a modal and a link to open the modal

## Installation

```bash
npm install react-modallink --save
```

## Usage

### Create a react-component that contains a Modal

```javascript
# MyModal.jsx
var Modal = require('react-modallink').Modal;

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
```

### Include a link for it in another component

```javascript


var MyModal = require('./MyModal.jsx');
var ModalLink = require('react-modallink').ModalLink;

var ComponentWithModalLink = React.createClass({
  render: function () {
    return (
      <div>
        <ModalLink modal={<MyModal something="anything" />}>
          <a>Open modal</a>
        </ModalLink>
      </div>
    );
  }
});
```

### Add some css into the mix

```css
.overlay {
  box-sizing: content-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: auto;
  color: #272b34;
  font-size: 1rem;
  z-index: 9999;
}

.overlay.hidden {
  display: none;
}

.overlay-top {
  box-sizing: content-box;
  position: relative;
  width: 699px;
  margin: 4% auto;
}

.overlay-content {
  box-sizing: content-box;
  position: relative;
  width: 699px;
  margin: 0 auto;
  margin-bottom: 4%;
  padding: 22.5px 30px;
  background-color: #F3F4F7;
  border-radius: 4px;
}

.overlay-close {
  box-sizing: content-box;
  position: absolute;
  top: 25.5px;
  right: 26px;
  cursor: pointer;
  z-index: 2000;
  padding: 0;
  color: #CED3E1;
  font-size: 4em;
  font-weight: 300;
  line-height: 1em;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
}
```


## Inspiration

Inspired by and modified from react-bootstrap and cupcake-react-modal.
