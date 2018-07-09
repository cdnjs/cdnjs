(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var DropdownSubmenu =
  /*#__PURE__*/
  function () {
    function DropdownSubmenu(element) {
      this.element = element.parentElement;
      this.menuElement = this.element.querySelector('.dropdown-menu');
      this.init();
    }

    var _proto = DropdownSubmenu.prototype;

    _proto.init = function init() {
      var _this = this;

      $(this.element).off('keydown.bs.dropdown.data-api');
      this.menuElement.addEventListener('keydown', this.itemKeydown.bind(this));
      var dropdownItemNodeList = this.menuElement.querySelectorAll('.dropdown-item');
      Array.from(dropdownItemNodeList).forEach(function (element) {
        element.addEventListener('keydown', _this.handleKeydownDropdownItem.bind(_this));
      });
      $(this.menuElement).on('keydown', '.dropdown-submenu > .dropdown-item', this.handleKeydownSubmenuDropdownItem.bind(this));
      $(this.menuElement).on('click', '.dropdown-submenu > .dropdown-item', this.handleClickSubmenuDropdownItem.bind(this));
      $(this.element).on('hidden.bs.dropdown', function () {
        _this.close(_this.menuElement);
      });
    };

    _proto.handleKeydownDropdownItem = function handleKeydownDropdownItem(event) {
      // 27: Esc
      if (event.keyCode !== 27) {
        return;
      }

      event.target.closest('.dropdown-menu').previousElementSibling.focus();
      event.target.closest('.dropdown-menu').classList.remove('show');
    };

    _proto.handleKeydownSubmenuDropdownItem = function handleKeydownSubmenuDropdownItem(event) {
      // 32: Spacebar
      if (event.keyCode !== 32) {
        return;
      } // NOTE: Off vertical scrolling


      event.preventDefault();
      this.toggle(event.target);
    };

    _proto.handleClickSubmenuDropdownItem = function handleClickSubmenuDropdownItem(event) {
      event.stopPropagation();
      this.toggle(event.target);
    };

    _proto.itemKeydown = function itemKeydown(event) {
      // 38: Arrow up, 40: Arrow down
      if (![38, 40].includes(event.keyCode)) {
        return;
      } // NOTE: Off vertical scrolling


      event.preventDefault();
      event.stopPropagation();
      var itemNodeList = this.element.querySelectorAll('.show > .dropdown-item:not(:disabled):not(.disabled), .show > .dropdown > .dropdown-item');
      var index = Array.from(itemNodeList).indexOf(event.target);

      if (event.keyCode === 38 && index !== 0) {
        index--;
      } else if (event.keyCode === 40 && index !== itemNodeList.length - 1) {
        index++;
      } else {
        return;
      }

      itemNodeList[index].focus();
    };

    _proto.toggle = function toggle(element) {
      var dropdownElement = element.closest('.dropdown');
      var parentMenuElement = dropdownElement.closest('.dropdown-menu');
      var menuElement = dropdownElement.querySelector('.dropdown-menu');
      var isOpen = menuElement.classList.contains('show');
      this.close(parentMenuElement);
      menuElement.classList.toggle('show', !isOpen);
    };

    _proto.close = function close(menuElement) {
      var menuNodeList = menuElement.querySelectorAll('.dropdown-menu.show');
      Array.from(menuNodeList).forEach(function (element) {
        element.classList.remove('show');
      });
    };

    return DropdownSubmenu;
  }(); // For AMD/Node/CommonJS used elements (optional)
  // http://learn.jquery.com/jquery-ui/environments/amd/


  $.fn.submenupicker = function (elements) {
    var $elements = this instanceof $ ? this : $(elements);
    return $elements.each(function () {
      var data = $.data(this, 'bs.submenu');

      if (!data) {
        data = new DropdownSubmenu(this);
        $.data(this, 'bs.submenu', data);
      }
    });
  };

  return DropdownSubmenu;
});