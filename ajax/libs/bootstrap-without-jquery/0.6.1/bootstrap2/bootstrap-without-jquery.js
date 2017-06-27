/*!
 * Bootstrap without jQuery v0.3.3 for Bootstrap 2
 * By Daniel Davis under MIT License
 * https://github.com/tagawa/bootstrap-without-jquery
 */

;(function() {
    'use strict';

    // querySelectorAll support for older IE
    // Source: http://weblogs.asp.net/bleroy/archive/2009/08/31/queryselectorall-on-old-ie-versions-something-that-doesn-t-work.aspx
    if (!document.querySelectorAll) {
        document.querySelectorAll = function(selector) {
            var style = document.styleSheets[0] || document.createStyleSheet();
            style.addRule(selector, 'foo:bar');
            var all = document.all, resultSet = [];
            for (var i = 0, l = all.length; i < l; i++) {
                if (all[i].currentStyle.foo === 'bar') {
                    resultSet[resultSet.length] = all[i];
                }
            }
            style.removeRule(0);
            return resultSet;
        };
    }

    // Get the "hidden" height of a collapsed element
    function getHiddenHeight(el) {
        var children = el.children;
        var height = 0;
        for (var i = 0, len = children.length, child; i < len; i++) {
            child = children[i];
            height += Math.max(child.clientHeight, child.offsetHeight, child.scrollHeight);
        }
        return height;
    }

    // Collapse and expand the relevent element 
    function doCollapse(event) {
        event = event || window.event;
        var evTarget = event.currentTarget || event.srcElement;
        var dataTarget = evTarget.getAttribute('data-target');
        var target = document.querySelector(dataTarget);
        var targetHeight = getHiddenHeight(target);
        var className = (' ' + target.className + ' ');

        if (className.indexOf(' in ') > -1) {
            // Hide the element
            className = className.replace(' in ', ' ');
            target.className = className;
            target.style.height = '0';
            evTarget.setAttribute('aria-expanded', false);
        } else {
            // Show the element
            target.className += ' in ';
            target.style.height = targetHeight + 'px';
            evTarget.setAttribute('aria-expanded', true);
        }
        return false;
    }

    // Show a dropdown menu
    function doDropdown(event) {
        event = event || window.event;
        var evTarget = event.currentTarget || event.srcElement;
        var target = evTarget.parentElement;
        var className = (' ' + target.className + ' ');
        
        if (className.indexOf(' open ') > -1) {
            // Hide the menu
            className = className.replace(' open ', ' ');
            target.className = className;
        } else {
            // Show the menu
            target.className += ' open ';
        }
        return false;
    }
    
    // Close a dropdown menu
    function closeDropdown(event) {
        event = event || window.event;
        var evTarget = event.currentTarget || event.srcElement;
        var target = evTarget.parentElement;
        
        target.className = (' ' + target.className + ' ').replace(' open ', ' ');
        
        // Trigger the click event on the target if it not opening another menu
        if(event.relatedTarget) {
            if(event.relatedTarget.getAttribute('data-toggle') !== 'dropdown'){
                event.relatedTarget.click();
            }
        }
        return false;
    }

    // Close an alert box by removing it from the DOM
    function closeAlert(event) {
        event = event || window.event;
        var evTarget = event.currentTarget || event.srcElement;
        var alertBox = evTarget.parentElement;
        
        alertBox.parentElement.removeChild(alertBox);
        return false;
    }
    
    // Set event listeners for collapsible menus
    var collapsibles = document.querySelectorAll('[data-toggle=collapse]');
    for (var i = 0, leni = collapsibles.length; i < leni; i++) {
        collapsibles[i].onclick = doCollapse;
    }

    // Set event listeners for dropdown menus
    var dropdowns = document.querySelectorAll('[data-toggle=dropdown]');
    for (var j = 0, dropdown, lenj = dropdowns.length; j < lenj; j++) {
        dropdown = dropdowns[j];
        dropdown.setAttribute('tabindex', '0'); // Fix to make onblur work in Chrome
        dropdown.onclick = doDropdown;
        dropdown.onblur = closeDropdown;
    }

    // Set event listeners for alert boxes
    var alerts = document.querySelectorAll('[data-dismiss=alert]');
    for (var k = 0, lenk = alerts.length; k < lenk; k++) {
        alerts[k].onclick = closeAlert;
    }

})();
