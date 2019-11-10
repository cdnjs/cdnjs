/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mb.bgndGallery.effects.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 15/03/14 22.12
 *  *****************************************************************************
 */

/*******************************************************************************
 *
 * mb.bgndGallery.effects
 * Author: pupunzi
 * Creation date: 26/06/13
 *
 ******************************************************************************/



// ENTER/EXIT EFFECTS

$.mbBgndGallery.effects={
	fade:{
		enter:{left:0,opacity:0},
		exit:{left:0,opacity:0},
		enterTiming:"ease-in",
		exitTiming:"ease-in"
	},
	slideUp:{
		enter:{top:"100%",opacity:1},
		exit:{top:0,opacity:0},
		enterTiming:"ease-in",
		exitTiming:"ease-in"
	},
	slideDown:{
		enter:{top:"-100%",opacity:1},
		exit:{top:0,opacity:0},
		enterTiming:"ease-in",
		exitTiming:"ease-in"
	},
	slideLeft:{
		enter:{x:"100%",opacity:0},
		exit:{x:"-100%",opacity:0},
		enterTiming:"easeOutQuad",
		exitTiming:"easeOutQuad"
	},
	slideRight:{
		enter:{x:"-100%",opacity:1},
		exit:{y:"100%",opacity:0}
	},
	zoom:{
		enter:{transform:"scale("+(1+ Math.random()*5)+")",opacity:0},
		exit:{transform:"scale("+(1 + Math.random()*5)+")",opacity:0},
		enterTiming:"cubic-bezier(0.19, 1, 0.22, 1)",
		exitTiming:"cubic-bezier(0.19, 1, 0.22, 1)"
	},

	zoomBlur:{ //the blur effect only works on webkit browsers.
		enter:{opacity:0, filter:"blur(30px)", transform: "scale(2)"},
		exit:{opacity:0, filter:"blur(30px)", transform: "scale(2)"},
		enterTiming:"cubic-bezier(0.19, 1, 0.22, 1)",
		exitTiming:"cubic-bezier(0.19, 1, 0.22, 1)"
	},

	blur:{ //the blur effect only works on webkit browsers.
		enter:{opacity:0, filter:"blur(30px)"},
		exit:{opacity:0, filter:"blur(30px)"},
		enterTiming:"cubic-bezier(0.19, 1, 0.22, 1)",
		exitTiming:"cubic-bezier(0.19, 1, 0.22, 1)"
	}
}
