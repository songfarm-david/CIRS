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
	// dynamically give carousel control a elements a tabindex of -1
	var aCtrls = document.getElementById("carousel-controls").getElementsByTagName("a");
	for (var i = 0; i < aCtrls.length; i++) {
		aCtrls[i].setAttribute("tabindex","-1");
	}

	// on click/focus carousel control, give focus to span element
	$("#carousel-controls a").on('click', function(e) {
		e.target.focus();
	});

	$("#carousel-controls a > span").on("keypress", function(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			this.parentElement.click();
			this.focus();
		}
	});
	$(".carousel-indicators li").on("keypress", function(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			this.click();
		}
	})

	/**
	* Initialize ARIA properties and select random active testimonial
	*/
	function ARIAInit() {

		// add class 'carousel-inner' to testimonials container + make display table
		carousel.firstElementChild.className = "carousel-inner";
		carousel.firstElementChild.style.display = "table";
		// display the carousel controls container
		document.getElementById("carousel-controls").style.display = "block";
		// dislay the carousel-indicators
		$(".carousel-indicators").css("display","block");

		// loop through first children of carousel
		for (var i = 0; i < testimonials.length; i++) {

			// add active class to first item
			if (i == 0) {
				// init active testimonial
				testimonials[i].classList.add("active");
				testimonials[i].setAttribute("aria-live","polite");
				testimonials[i].setAttribute("aria-hidden","false");
			} else {
				// hide other testimonials
				testimonials[i].setAttribute("aria-hidden","true");
				testimonials[i].style.display = "none";
			}

		} // end of loop

	}

	/* when the slide instance finishes */
	$("#testimonials").on("slid.bs.carousel", function(e) {

		for (var i = 0; i < testimonials.length; i++) {
			// for the item that previously had the class of active
			if (testimonials[i].className.indexOf("active") > -1) {
				testimonials[i].setAttribute("aria-hidden","false");
				testimonials[i].setAttribute("aria-live","polite");
				$(testimonials[i])
				.css({
						"display"	:	"table-cell"
					,	"opacity" : "0.35"
					,	"left"		: "200%"
				}).animate({
					"opacity" : 1
				,	"left" : 0
				}, 1000);
			} else {
				testimonials[i].style.display = "none";
				testimonials[i].setAttribute("aria-hidden","true");
				testimonials[i].removeAttribute("aria-live");
			}
		}

	})

	/**
	* Set carousel slide cycle time
	*/
	$(".carousel").carousel({
		interval: 5000
	,	wrap: false	// cycle once then stop
	});



	// Initialize ARIA and Carousel
	ARIAInit();



})();
