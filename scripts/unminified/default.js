(function(){

	/*** Desktop Navigation ***/

	// first dropdown trigger
	var trigger = $("li.dropdown > a");
	// sub-menu trigger
	var subTrigger = $("li.dropdown-submenu > a");
	var subTriggerSibling = $("ul#navbar-xs > li:nth-child(2) > a"); // (thermal mass)
	// dropdown menus
	var firstDropdown = $("#navbar-xs");
	var secondDropdown = $("#navbar-xs-submenu");

	var dropdownsArray = $.makeArray(firstDropdown,secondDropdown);
	var timeout;
	var eventDisabled = false;

	// add initial ARIA properties
	$.each(dropdownsArray, function(i, dropdown) {
		$(dropdown).attr("aria-haspopup","true").attr("aria-expanded","false");
	});

	/**
	* Function to attach mouse events to navigation elements including dropdowns
	*/
	function attachEvents() {

		$(trigger).mouseover(function() {
				toggleARIAProps(firstDropdown);
				$(firstDropdown).css("left","0px");
			}).mouseout(function() {
				timeout = setTimeout(function() {
					toggleARIAProps(firstDropdown);
					$(firstDropdown).css("left","-9999px");
				}, 1000);
			}
		);

		// on first menu hover, clear timeout
		$(firstDropdown).mouseover(function() {
				clearTimeout(timeout);
			}).mouseout(function() { // on mouseout, start timer then hide dropdown
				timeout = setTimeout(function() {
					toggleARIAProps(firstDropdown);
					$(firstDropdown).css("left","-9999px");
				}, 1000);
			}
		);

		// on sub trigger, show second dropdown
		$(subTrigger).mouseover(function() {
				toggleARIAProps(secondDropdown);
				$(secondDropdown).css("display","block");
			}).mouseout(function() {
				// on mouseout, start timer then hide dropdown
				setTimeout(function() {
					$(secondDropdown).css("display","");
					toggleARIAProps(secondDropdown);
				}, 1000);
			}
		);

		// iPad on touch, show first dropdown
		$(trigger).on( {"touchstart" : function(e) {
				// prevent link from firing
				e.preventDefault();
				$(firstDropdown).css("left","0px");
			}
		});

		// prevent second dropdown menu from displaying
		$(subTrigger).on( {"touchstart" : function() {
				$(this).unbind();
				$("#navbar-xs-submenu").css("display","none");
				$(this).click();
			}
		});

		// give touch links focus (for more enjoyable experience)
		$("a, figure").on( {"touchstart" : function() {
				$(this).focus();
			}
		});

	} // end of attachEvents()

	function detachEvents() {
		$(trigger, subTrigger, firstDropdown).off("mouseover mouseout");
		// turn off iPad touch event
		$(trigger).off("touchstart");
		// must declare separately .off for subTrigger
		$(subTrigger).off("mouseout mouseover");
	}

	function toggleARIAProps(elem) {
		var elem = elem[0];
		( $(elem).attr("aria-expanded") === "false" ) ? $(elem).attr("aria-expanded","true") : $(elem).attr("aria-expanded","false");
	}

	/**
	* Function for manually putting focus on the next logical list item
	*/
	function siblingFocus() {
		$(subTriggerSibling).focus();
	}

	/**
	 * Control tab flow and dropdown menu behavior
	 */
	$("#navbar > li.dropdown > a")
	.keyup(
		function(e) {
			// control moving focus to dropdown trigger
			if (e.shiftKey && e.keyCode == 9) {
				$(subTrigger).on("focusout", siblingFocus);
			}
			// and moving control out
			if (e.keyCode == 9 && !e.shiftKey) {
				toggleARIAProps(firstDropdown);
			}
		}
	).keydown(
		function(e) {
			if (e.shiftKey && e.keyCode == 9) {
				toggleARIAProps(firstDropdown);
				$(firstDropdown).css("left","");
			}
		}
	);

	/* top level ul, second list item */
	$("ul#navbar > li:nth-child(2) a").focus(
		function() {
			$(firstDropdown).css("left","");
		}
	).keydown(
		function(e) {
		// if shiftKey + altKey
		if (e.shiftKey && e.keyCode == 9) {
				$(firstDropdown).last().focus();
				$(firstDropdown).css("left","0px");
				toggleARIAProps(firstDropdown)
			}
		}
	).keyup(
		function(e) {
			if (e.keyCode == 9 && !e.shiftKey) {
				toggleARIAProps(firstDropdown)
			}
		}
	);

	/* subTrigger control events */
	$(subTrigger).focusin(
		function() {
			$(firstDropdown).css("left","0px");
		}
	).keyup(
		function(e) {
			if (e.keyCode == 9 && !e.shiftKey) {
				eventDisabled = false;
				$(subTrigger).on("focusout", siblingFocus);
				toggleARIAProps(secondDropdown);
			}
			if (e.keyCode == 39) { // arrow right
				$(subTrigger).off("focusout", siblingFocus);
				$(document.getElementById("navbar-xs-submenu"))
					.css({ // make second dropdown submenu visible
						"left" : "99%", "display" : "block"
					});
				// focus second dropdown, first list item anchor tag
				document.getElementById("navbar-xs-submenu")
					.firstElementChild.firstElementChild.focus();
			}
			// if last key up was left arrow or shift + tab
			if (e.keyCode == 37 || e.shiftKey && e.keyCode == 9) {
				$(subTrigger).off("focusout", siblingFocus);
				if ( $(secondDropdown).attr("aria-expanded") == "false" ) {
					toggleARIAProps(secondDropdown);
				}
			}
		}
	).keydown(
		function(e) {
			if (e.keyCode == 9 && !e.shiftKey || e.shiftKey && e.keyCode == 9) {
				$(document.getElementById("navbar-xs-submenu"))
				.css({ // hide second dropdown submenu
					"left" : "", "display" : ""
				});
				toggleARIAProps(secondDropdown);
			}
		}
	);

	/* first dropdown, second list item */
	$(subTriggerSibling).keydown(
		function(e) {
			// if arrow right key event
			if (e.shiftKey && e.keyCode == 9) {
				$(subTrigger).off("focusout", siblingFocus);
			}
		}
	);

	/* second dropdown, first child */
	$("#navbar-xs-submenu li:first-child a").keydown(
		function(e) {
			// var closeDropdown = false;
			if (e.keyCode == 37) { // arrow left
				subTrigger.focus();
				$(document.getElementById("navbar-xs-submenu"))
					.css({ // hide second dropdown submenu
						"left" : "", "display" : ""
					});
			}
		}
	);

	/* second dropdown, last child */
	$("#navbar-xs-submenu li:last-child").first().keydown(
		function(e) {
			if (e.keyCode == 9) {
				$(document.getElementById("navbar-xs-submenu")).css(
					{
						"left" : "", "display" : ""
					}
				);
				$("#navbar-xs > li:nth-child(1) a").focus();
				toggleARIAProps(secondDropdown);
			}
		}
	)

	attachEvents();

	/** end of Nav **/


	/*** Mobile Navigation ***/

	var isMenu;
	// reset marker for phone icon state
	var isPhoneIcon = false;
	// marker for phone animation complete
	var animationComplete = false;
	// create the hamburger menu
	var hamburger = document.createElement("button");
	hamburger.setAttribute("type","button");
	hamburger.className = "navbar-toggle";
	hamburger.setAttribute("data-toggle","collapse");
	hamburger.setAttribute("data-target","#navbar");
	// add the vertical lines 3 times
	for (var i = 0; i < 3; i++) {
		// create vertical lines
		var iconBar = document.createElement("span");
		iconBar.className = "icon-bar";
		hamburger.appendChild(iconBar);
	}

	function animatePhone(e) {
		// if animation has run, trigger natural event
		if (animationComplete) {
			// alert("event triggered");
			animationComplete = false;
			$(e.currentTarget).data("expanded","true");
			return true;
		}

		e.preventDefault();
		$(e.currentTarget).addClass("full-length")
		.animate({
			width:"270px",
		}, 600, function(){
			animationComplete = true;
			$(e.currentTarget).css("width","auto");
			$(e.target).trigger("click");
		});

	}

	function deAnimatePhone(e) {
		$(e.currentTarget).animate({
			width : "50px"
		}, 600, function() {
			$(e.currentTarget).removeClass("full-length");
			animationComplete = false;
			$(e.currentTarget).data("expanded","false")
		});
	}

	function createMobileMenu() {

		$("nav > a.call-us").on("click", function(e) {

			if ($(this).data("expanded") == "true") {
				e.preventDefault();
				deAnimatePhone(e);
			} else {
				animatePhone(e);
			}

		});

		$("#nav-primary").append(hamburger);
		$("#navbar").css("left","0");
		$("#navbar").addClass("collapse").removeClass("navbar-nav");
		// $("#navbar > li:first-child > a").attr("href","#").attr("data-toggle","collapse").attr("data-target","#navbar-xs");
		$("#navbar-xs").addClass("collapse").removeClass("dropdown-menu");
		isMenu = true;

	}

	function revertMobileMenu() {

		$("#nav-primary > button").remove();
		$("#navbar").addClass("navbar-nav").removeClass("collapse");
		$("#navbar > li:first-child > a").attr("href","infloor_heat.php").removeAttr("data-toggle").removeAttr("data-target");
		$("#navbar-xs").removeClass("collapse").addClass("dropdown-menu");
		isMenu = false;

		// turn off click events for phone animation
		$("nav > a.call-us").off("click");

	}

	/**
	* If screen is loaded on XS device size
	*/
	window.onload = function() {
		if (window.innerWidth <= 767) {
			createMobileMenu();
			// clear all hover events
			detachEvents();
		}
	}

	/**
	* On resize
	* less than or equal to 767px => add hamburger navigation
	* greater than 767px, remove hamburger navigation
	*/
	$(window).resize(function() {
		if (window.innerWidth <= 767) {
			if (!isMenu) {
				createMobileMenu();
			}
			// reset a.call-us phone icon styles/behavior */
			isPhoneIcon = false;
			// turn off hover events for nav dropdown menus
			detachEvents();
		}
		if (window.innerWidth >= 768) {
			if (isMenu) {
				revertMobileMenu();
			}

			attachEvents();

			if (isPhoneIcon) {
				return false;
			} else {
				$("nav > a.call-us").removeClass("full-length");
				$("nav > a.call-us")[0].style.width = "";
				isPhoneIcon = true;
				$("nav > a.call-us").stop();
			}

		}
	});

	// create a span with a glyphicon
	var plusIcon = "<span class=\"glyphicon glyphicon-chevron-down\" data-toggle=\"collapse\" data-target=\"#navbar-xs\"></span>";
	// $("li > a > span.caret").after(plusIcon);
	$(plusIcon).insertAfter($("#navbar > li:first-child"));

	$("#navbar > li.dropdown + span").on("click", function(e) {
		if ($(this).attr("aria-expanded") == "true") {
			$(this).removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");

		} else {
			$(this).removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");

		}
	})

	/** end of Mobile Nav **/


	/*** Img Pop-Out ***/

	// create a virtual modal element
	var modal = document.createElement("div");
	modal.className = "modal fade";
	modal.innerHTML =
	"<div role=\"presentation\" class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button></div><div class=\"modal-body\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" tabindex=\"0\">Close</button></div></div></div>";
	// get handles to Modal Header, Body and Footer
	var modalHeader = modal.firstElementChild.firstElementChild.firstElementChild;
	var modalBody = modal.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
	var modalFooter = modal.firstElementChild.firstElementChild.lastElementChild;

	// collect all figures on the page
	var figureSet = document.getElementsByTagName("figure");
	// loop through figure images
	for (var i = 0; i < figureSet.length; i++) {

		// NOTE: optional selection of only figures with 'data-pop-out="true"
		if (figureSet[i].getAttribute("data-pop-out")) {
			// add class pop-out to the figure
			figureSet[i].className = figureSet[i].className + " pop-out";

			figureSet[i].addEventListener("click", function() {
				var imgText, imgTitle, imgWidth;

				// clone the figures' img element
				var modalImg = this.firstElementChild.cloneNode(false);

				imgWidth = modalImg.width;
				// if the width of the pop-out is too small
				if (modalImg.width < 450) {
					// set to 450px
					imgWidth = 450 + "px";
				}

				// if a title attribute exists,
				// create a new text tode and populate with title of default
				if (modalImg.title) {
					imgTitle = document.createTextNode(modalImg.title);
				} else {
					imgTitle = document.createTextNode("(Untitled image)");
				}

				// if exists text data, set imgText to text data
				if (this.lastElementChild.childNodes[0].data != null) {
					imgText = this.lastElementChild.childNodes[0].data;
					imgText = document.createTextNode(imgText);
				} else {
					imgText = document.createTextNode("");
				}

				// Append the image, title and image text to the modal
				modalBody.appendChild(modalImg);
				modalHeader.appendChild(imgTitle);
				var footerBtn = modalFooter.firstElementChild;
				modalFooter.insertBefore(imgText, footerBtn);

				// fire the modal
				$(modal).modal();
				$(modal).on('shown.bs.modal', function () {
					// give focus to the close button
					var modalCloseBtn = modal.getElementsByTagName("button")[1];
				  modalCloseBtn.focus()
				})

			}, false); // End of: addEventListener
		}

	}

	/**
	* On modal close, remove all modal content
	*/
	$(modal).on("hide.bs.modal", function(){
		var modalTitle = modalHeader.firstElementChild.nextSibling;
		var modalImg = modalBody.firstElementChild;
		var modalText = modalFooter.childNodes[0];
		modalHeader.removeChild(modalTitle);
		modalBody.removeChild(modalImg);
		modalFooter.removeChild(modalText);
	});



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

		var timeout = setTimeout(function() {
			runCarousel();
		}, 60000);

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
				e.relatedTarget.style.display = "block";
			} else {
				testimonials[i].style.display = "none";
			}
		}
	});

	function runCarousel() {
		//Bootstrap carousel object and controls
		$(".carousel").carousel({
			interval : 20000
			,wrap : false
		});
	}

	// Initialize ARIA and Carousel
	ARIAInit();

})();
