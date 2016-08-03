(function(){

	/*** Detect IE Browser Version ***/
	// NOTE: Browser is global variable
		// if using less than IE9
		if (Browser.isIE && Browser.version < 9) {
			return false;
		}
		// if IE9
		else if (Browser.isIE && Browser.version == 9) {
			// load fallback script
			$.getScript("scripts/BSCarousel_IE.js");
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
	// prevent carousel control <a> elements from receiving focus
	var aCtrls = document.getElementById("carousel-controls").getElementsByTagName("a");
	for (var i = 0; i < aCtrls.length; i++) {
		aCtrls[i].setAttribute("tabindex","-1");
	}

	/**
	* Initialize ARIA properties and select random active testimonial
	*/
	function ARIAInit() {
		// add class 'carousel-inner' to testimonials container
		carousel.firstElementChild.className = "carousel-inner";
		// display hidden control elements
		document.getElementById("carousel-controls").style.display = "block";
		$(".carousel-indicators").css("display","block");

		// loop through first children of carousel
		for (var i = 0; i < testimonials.length; i++) {
			// add active class to first item
			if (i == 0) {
				// init active testimonial
				testimonials[i].classList.add("active");
				testimonials[i].setAttribute("aria-hidden","false");
			} else {
				// hide other testimonials
				testimonials[i].setAttribute("aria-hidden","true");
			}
		} // end of loop
	}

	// on click/focus carousel control, give focus to span element
	$("#carousel-controls a").click(
		function(e) {
			if (e.target.localName == "a") {
				e.target.firstElementChild.focus();
			} else {
				return false;
			}
		}
	);

	/* keyboard & accessibility events */
	$("#carousel-controls a > span").keydown(
		function(e) {
			if (e.keyCode == 13 || e.keyCode == 32) {
				this.parentElement.click();
				this.focus();
			}
		}
	).click(
		function(e) {
			this.parentElement.click();
			this.focus();
		}
	);

	$(".carousel-indicators li").on("keypress", function(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			this.click();
		}
	});

	/* Bootstrap event - on slide change start */
	$("#testimonials").on("slide.bs.carousel", function(e) {
		for (var i = 0; i < testimonials.length; i++) {
			if (testimonials[i] == e.relatedTarget) {
				e.relatedTarget.setAttribute("aria-hidden","false");
				e.relatedTarget.setAttribute("aria-live","polite");
				e.relatedTarget.style.display = "block";
			} else {
				testimonials[i].setAttribute("aria-hidden","true");
				testimonials[i].removeAttribute("aria-live");
				testimonials[i].style.display = "none";
			}
		}
	});

	/**
	* Bootstrap carousel object and controls
	*/
	$(".carousel").carousel({
		interval: 8000
	,			wrap: false
	});

	// Initialize ARIA and Carousel
	ARIAInit();

})();
