(function(){

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
