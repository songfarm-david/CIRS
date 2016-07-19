(function(){

	/*** Navigation ***/
	/*
	* Handles navigation behavior including hover and focus states
	* as well as the inclusion of ARIA states and properties
	*/
	var target, dropdownMenu;
	// target the ul
	var navChildren = document.getElementById("nav-primary").children;
	// cycle through children of navigation for ul element
	for (var i = 0; i < navChildren.length; i++) {
		if (navChildren[i].nodeName == "UL") {
			// target the first list time
			var target = navChildren[i].firstElementChild.firstElementChild;
			// target the dropdown menu
			var dropdownMenu = navChildren[i].firstElementChild.lastElementChild;
		}
	}
	// on target focus
	target.addEventListener("focusout", function() {
		dropdownMenu.style.left = 0;
		dropdownMenu.firstElementChild.addEventListener("focusout", function() {
			// when focus moves out of targets' first list item,
			// immediately put focus on second list item
			this.nextElementSibling.firstElementChild.focus();
		} false);
	}, false);
	// on focus targets' adjacent list item
	target.parentElement.nextElementSibling.addEventListener("focusin", function() {
		dropdownMenu.style.left = -9999+"px";
	}, true);



	/*** Detect IE Browser Version ***/
	// NOTE: Browser is global variable
		// if using less than IE9
		if (Browser.isIE && Browser.version < 9) {
			console.log(Browser.version);
			return false;
		}
		// if IE9
		else if (Browser.isIE && Browser.version == 9) {
			console.log(Browser.version);
			// load fallback script
			$.getScript("scripts/bootstrapCarouselIE.js");
			return false;
		}


	/*** Carousel ***/
	/*
	* Handles the initialization of ARIA states and properties
	* Handles the toggling and updating of ARIA properties during carousel cycling
	*/
	// get handle to the carousel
	var carousel = document.getElementById("testimonials");
	// get all testimonials
	var testimonials = carousel.firstElementChild.children;
	// generate random number between 0 and length of testimonials
	var randomNumber = getRandomArbitrary(0,testimonials.length);

	/**
	* Initialize ARIA properties and select random active testimonial
	*/
	function ARIAInit() {
		// loop through first children of carousel
		for (var i = 0; i < testimonials.length; i++) {
			// match random number to index
			if (i == randomNumber) {
				// add class active to elements' class list
				testimonials[i].classList.add("active");
				// apply aria-hidden="false", aria-live="polite"
				testimonials[i].setAttribute("aria-hidden","false");
				testimonials[i].setAttribute("aria-live","polite");
			} else {
				// apply aria-hidden="true"
				testimonials[i].setAttribute("aria-hidden","true");
			}
		} // end of loop
		// add class carousel-inner to testimonials container
		carousel.firstElementChild.className = "carousel-inner";
		// display the carousel controls container
		document.getElementById("carousel-controls").style.display = "block";
	}

	/**
	* Update ARIA properties on active slide
	* NOTE: failed to detect bs events with pure Javascript
	*/
	$("#testimonials").on("slide.bs.carousel", function(e){
		// set next targets' ARIA properties
		e.relatedTarget.setAttribute("aria-hidden","false");
		e.relatedTarget.setAttribute("aria-live","polite");
		// loop through testimonials
		for (var i = 0; i < testimonials.length; i++) {
			if (testimonials[i].className	.indexOf("active") > -1) {
				testimonials[i].setAttribute("aria-hidden","true");
				testimonials[i].removeAttribute("aria-live");
			}
		}
	});

	/**
	* Set carousel slide cycle time
	*/
	$(".carousel").carousel({
		interval: 8000
		// wrap: false // property determines if carousel stops at end of cycle
	});

	/*
	* Generate a random number between min (inclusive) and max (exclusive)
	*/
	function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
	}

	// Initialize ARIA and Carousel
	ARIAInit();


})();
