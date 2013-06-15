Collapsible, jQuery Plugin

Overview:
================================================================================
This plugin enables site owners to control multiple collapsible panels by auto 
opening any defaults specified, and keeping those opened/closed by users as they 
left them while browsing your site.

If you find any errors or have suggested changes, please post a comment on the 
github project: http://github.com/juven14/Collapsible

Very Basic demos can be found here: 
http://www.snyderplace.com/demos/collapsible.html
________________________________________________________________________________
================================================================================


Adding a collapsible panel to your html:
================================================================================

You have to create your own html for the collapsible. You need a header element 
(here as h3, can be div or etc) that gets the "collapsible" class assigned and a 
body element. However, the slide effect will be choppy if you have margins and 
padding for the container, so here we just use a div. Here I've used 
"collapsible" but you can choose any other selector. Here is an example:

---HTML code--------------------------------------------------------------------
<h3 class="collapsible" id="nav-section1">Navigation Section<span></span><h3>
<div>
    <ul>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
  </ul>
</div>
<h3 class="collapsible" id="nav-section2">Navigation Section<span></span><h3>
<div>
    <ul>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
  </ul>
</div>
<h3 class="collapsible" id="nav-section3">Navigation Section<span></span><h3>
<div>
    <ul>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
    <li><a href="#">Navigation Item</a></li>
  </ul>
</div>
---end HTML code----------------------------------------------------------------
________________________________________________________________________________
================================================================================


Adding the Javascript to your file:
================================================================================

JavaScript which belongs in the head of the html document, using the 
cookie plugin is optional.  Please note that our default open / config is only
an example as related to the above HTML.

---JavaScript code--------------------------------------------------------------
<script type="text/javascript" src="javascript/jquery.cookie.js"></script>
<script type="text/javascript" src="javascript/jquery.collapsible.js"></script>
<script type="text/javascript">
  $(document).ready(function() {
    //collapsible management
    $('.collapsible').collapsible({
      defaultOpen: 'nav-section1,nav-section3'
    });
  });
</script>
---end JavaScript code----------------------------------------------------------

The plugin default options are as follows:
---JavaScript code--------------------------------------------------------------
{
    cssClose: 'collapse-close',
    cssOpen: 'collapse-open',
    cookieName: 'collapsible',
    cookieOptions: {
        path: '/',
        expires: 7,
        domain: '',
        secure: ''
    },
    defaultOpen: '',
    speed: 300,
    bind: 'click',
    animateOpen: function (elem, opts) { 
        elem.next().slideUp(opts.speed);
    },
    animateClose: function (elem, opts) {
        elem.next().slideDown(opts.speed);
    }
}
---end JavaScript code----------------------------------------------------------

Option details:

 * cssClose - This is the class you want assigned when it is closed.
 * cssOpen - This is the class you want assigned when it is opened.
 * cookieName - This is the name of the cookie that will store which 
   collapsibles should be open.
 * cookieOptions - See the jquery.cookie plugin for more information.
 * defaultOpen - This is comma separated list of collapsible header ids.
 * speed - This is the animation speed for the slide up/down.
 * bind - This is the event that you want the collapsibles to function on. only 
   4 are supported: click, dblclick, mouseenter, and mouseover.
 * animateOpen - This is a custom callback to alter the way that an element 
   is opened.
 * animateClose - This is a custom callback to alter the way that an element 
   is closed.

Methods:

You can call following methods on collapsible elements:

 * collapsed - returns 'true' if element is collapsed
 * toggle - toggle collapsible state
 * open - open a collapsible
 * close - close a collapsible

Call them using jquery-ui style:
  $(selector).collapsible('method', [arg]);

Examples:
  if ( $('#nav-block').collapsible('collapsed') ) { ... }
or
  appendToLog('Error: service is down!');
  $('#nav-logs').collapsible('open');

________________________________________________________________________________
================================================================================


Styling 
================================================================================

In the above example HTML you will see a span, this is useful if you wish to 
assign an open/close image.

This plugin will append a user defined (or default, see options above) class to 
header of the collapsible.  You can use this to swap out the images or style 
the different states of your collapsible.

---CSS code---------------------------------------------------------------------
.collapsible h3.collapse-open {}
.collapsible h3.collapse-close {}

.collapsible h3.collapse-open span {}
.collapsible h3.collapse-close span {}
---end CSS code-----------------------------------------------------------------

________________________________________________________________________________
================================================================================