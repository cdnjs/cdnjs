angular.module('homeTemp', ['home.html']);

angular.module("home.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("home.html",
    "<!-- NAVBAR\n" +
    "================================================== -->\n" +
    "<div id=\"rib-front-page\">\n" +
    "<div class=\"menu-wrapper\">\n" +
    "    <div class=\"navbar-wrapper\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"logo\">\n" +
    "                <img src=\"assets/images/logo.png\"/>\n" +
    "            </div>\n" +
    "            <div class=\"right-panel\">\n" +
    "                <a href=\"/hwapp/#/app-market\">App Market</a>\n" +
    "                <a  href=\"/hwapp/#/app-market\">Sign Up</a>\n" +
    "                <a type=\"button\" id=\"show-login\" href=\"/hwapp/#/hwAuth/login/\">Login</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<!-- Carousel\n" +
    "================================================== -->\n" +
    "<div id=\"myCarousel\" class=\"carousel slide\" data-ride=\"carousel\">\n" +
    "    <!-- Indicators -->\n" +
    "    <ol class=\"carousel-indicators\">\n" +
    "        <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\n" +
    "        <li data-target=\"#myCarousel\" data-slide-to=\"1\"></li>\n" +
    "        <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li>\n" +
    "        <!-- <li data-target=\"#myCarousel\" data-slide-to=\"2\"></li> -->\n" +
    "    </ol>\n" +
    "    <div class=\"carousel-inner\">\n" +
    "        <div class=\"item active\">\n" +
    "            <div class=\"cover-bg slider-01\"></div>\n" +
    "            <div class=\"container\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"carousel-caption\">\n" +
    "                        <div class=\"col-sm-8 col-sm-offset-2 text-center\">\n" +
    "                            <h1 class=\"h-two animated bounceInDown\"> Welcome to <br/>HubWorks!</h1>\n" +
    "                            <p class=\"get-started-content animated\"><span id=\"highlight\">\n" +
    "							The easiest, most complete scheduling  system <br>available to businesses today. </span></p>\n" +
    "                            <p class=\"get-started-text animated\"><a class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/app-market\" role=\"button\"><strong>Get Started</strong></a></p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item\">\n" +
    "            <div class=\"cover-bg slider-02\"></div>\n" +
    "            <div class=\"carousel-caption\">\n" +
    "                <div class=\"col-sm-8 col-sm-offset-2 text-center\">\n" +
    "                    <div class=\"\">\n" +
    "                        <div class=\"space-16\"></div>\n" +
    "                        <h1 class=\"h-two animated bounceInDown\">\n" +
    "                            <img width=\"470px\" src=\"assets/images/ZipSchedulesLogoandTagline.png\" class=\"img-responsive\">\n" +
    "                        </h1>\n" +
    "                        <p class=\"get-started-content animated\"><span id=\"highlight\">\n" +
    "						  The easiest, most complete scheduling<br/>\n" +
    "						  system available to businesses today.\n" +
    "						   </span></p>\n" +
    "\n" +
    "                    </div>\n" +
    "                    <p class=\"get-started-text animated\">\n" +
    "                        <a class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/zipsch-overview\" role=\"button\"><strong>Sign up for your Free 45-Day Trial Now! </strong></a>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item\">\n" +
    "            <div class=\"cover-bg slider-03\"></div>\n" +
    "            <div class=\"carousel-caption \">\n" +
    "                <div class=\"col-sm-8 col-sm-offset-2 text-center\">\n" +
    "                    <h1 class=\"h-three animated bounceInDown\">\n" +
    "                        <img width=\"470px\" src=\"assets/images/zipclockbig.png\" class=\"img-responsive\">\n" +
    "                    </h1>\n" +
    "                    <p class=\"get-started-content animated\">\n" +
    "                        <span id=\"highlight\">\n" +
    "                        Easily monitor and control employees' compliance with work schedules.</span>\n" +
    "                    </p>\n" +
    "                    <p class=\"get-started-text animated\">\n" +
    "                        <!--               <a class=\"btn no-radius btn-lg get-started\" href=\"#/app-market\" role=\"button\">Start my free trial</a> -->\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"section-03\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-5 col-xs-12\">\n" +
    "                <h1> What is <img src=\"assets/images/footer-logo.png\" class=\"img-responsive rib-logo-sec3\"/> <span style=\"display: inline-block;float: right;margin: 6px 34px 0 0;\">?</span> </h1>\n" +
    "                <p class=\"text\">\n" +
    "                    HubWorks is a collection of easy to use affordable apps\n" +
    "                    to help manage your business operations.\n" +
    "                    Sign up today for your free HubWorks account to gain exclusive access.\n" +
    "                </p>\n" +
    "                <div class=\"text-center-xs\">\n" +
    "                    <a class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/zipsch-overview\" role=\"button\"><strong>Sign up today!</strong></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"clearfix hidden visible-xs\"></div>\n" +
    "            <div class=\"space-16 hidden visible-xs\"></div>\n" +
    "            <div class=\"col-sm-7 col-xs-12\">\n" +
    "                <div class=\"relative clearfix img-desk-tab\" >\n" +
    "                    <img src=\"assets/images/desktop_hero.png\" class=\"img-responsive img-desk\"/>\n" +
    "                    <img src=\"assets/images/tablet_hero.png\" class=\"img-responsive img-tab\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div id=\"section-02\" data-speed=\"400\" data-type=\"background\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-6 pull-right  text-right\">\n" +
    "                <h2 class=\"\"><strong>ZipSchedules</strong></h2>\n" +
    "                      <span>The simple, easy way to create <br>clear, manageable employee <br>schedules for your business.</span>\n" +
    "                <div class=\"clearfix\"></div>\n" +
    "                <div class=\"space-10\"></div>\n" +
    "                <div class=\"text-right\">\n" +
    "                    <a class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/app-market\" role=\"button\"><strong>Start scheduling now!</strong></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"section-05\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-sm-4 col-xs-12 text-center\">\n" +
    "                <div class=\"img-bg-circle\">\n" +
    "                    <img src=\"assets/images/calendar_white.png\" class=\"img-responsive\"/>\n" +
    "                </div>\n" +
    "                <div style=\"height: 75px;\">\n" +
    "                    <img src=\"assets/images/ZipSchedulesLogoandTagline.png\" class=\"img-responsive\" height=\"229\"/>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    <p>\n" +
    "                        The simple, easy way to create clear, manageable employee schedules for a restaurant.\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    <a class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/zipsch-overview\" role=\"button\"><strong>Learn More</strong></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4 col-xs-12 text-center\">\n" +
    "                <div class=\"img-bg-circle\">\n" +
    "                    <img src=\"assets/images/clock_white.png\" class=\"img-responsive\"/>\n" +
    "                </div>\n" +
    "                <div style=\"height: 75px;\">\n" +
    "                    <img src=\"assets/images/zipclocklogo.png\" height=\"75\"/>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    <p>\n" +
    "                        The easy, affordable way for restaurant owners to control and monitor employee compliance with work schedules\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "\n" +
    "                <div>\n" +
    "                    <a class=\"btn no-radius btn-lg get-started no-poniter\" href=\"/hwapp/#/zipclock-overview\" role=\"button\"><strong>Learn More</strong></a>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-4 col-xs-12 text-center\">\n" +
    "                <div class=\"img-bg-circle\">\n" +
    "                    <img src=\"assets/images/restaurantLogBook_white.png\" class=\"img-responsive\" />\n" +
    "                </div>\n" +
    "                <div style=\"height: 75px;\">\n" +
    "                    <h1 class=\"no-margin\" style=\"padding:0;line-height: 34px\">\n" +
    "                        <i>Restaurant Red Book</i>\n" +
    "                    </h1>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    <p>\n" +
    "                        The fast, easy way to streamline restaurant operations.\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <div>\n" +
    "                    <a class=\"btn no-radius btn-lg get-started no-poniter\" href=\"/hwapp/#/app-market\" role=\"button\"><strong>Coming Soon!</strong></a>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"section-06\" data-speed=\"1010\" data-type=\"background\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"slider-items\">\n" +
    "                <div class=\"item\">\n" +
    "                    <div class=\"col-sm-7 pull-right text-right \">\n" +
    "                        <p><i>\n" +
    "                            \"ZipSchedules is so intuitive and easy to use! I spend less time managing my employees' schedules and more time with the customers!\"</i>\n" +
    "                        </p>\n" +
    "                        <div class=\"clear\"></div>\n" +
    "                        <div class=\"space-10\"></div>\n" +
    "                        <p class=\"text-right col-xs-12\"><i> - Manager, Fresh Griller </i></p>\n" +
    "                        <a class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/zipsch-overview\" role=\"button\">\n" +
    "                            <strong>Try it today!</strong>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"section-10\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-7 col-sm-8\" style=\"float: none; margin: 0px auto;\">\n" +
    "                <div class=\" center sec-10-header\">\n" +
    "                                       <a style=\"font-size: 25px;\" class=\"btn no-radius btn-lg get-started\" href=\"/hwapp/#/app-market\" role=\"button\"><strong>Sign up today!</strong></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div id=\"footer\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"footer\" style=\"text-align: center;\">\n" +
    "            <div class=\"footer-logo\">\n" +
    "                <img width=\"\" height=\"44\" src=\"assets/images/logo.png\" style=\"opacity: 0.4;\">\n" +
    "            </div>\n" +
    "            <div class=\"footer-content\">\n" +
    "                3191 Red Hill Ave. Costa Mesa, CA 92626 USA <br>\n" +
    "                Contact Us: (800) 654-6909 support@hubworks.com\n" +
    "            </div>\n" +
    "            <div class=\"footer-right\">\n" +
    "                <p class=\"no-margin\">&copy; Copyright 2014 / All Rights Reserved</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
