(function(){

	/*** Desktop Navigation ***/

	// dropdown triggers
	var triggerDropdown = $("li.dropdown > a");
	var subTriggerDropdown = $("li.dropdown-submenu > a");
	// dropdown menus
	var firstDropdown = $("#navbar-xs");
	var secondDropdown = $("#navbar-xs-submenu");
	// first dropdown, first li
	var subTrigger = $("ul#navbar-xs > li:nth-child(1) > a");
	// first dropdown, first li sibling
	var subTriggerSibling = $("ul#navbar-xs > li:nth-child(2) > a");

	var dropdownsArray = $.makeArray(firstDropdown,secondDropdown);
	var timeout;
	// add initial ARIA properties
	$.each(dropdownsArray, function(i, dropdown){
		$(dropdown).attr("aria-haspopup","true").attr("aria-expanded","false");
	});

	/**
	* Create function to attach mouse events to navigation elements
	*/
	function attachMouseEvents() {

		$(triggerDropdown).mouseover(function(e) {
				toggleARIAProps(firstDropdown);
				$(firstDropdown).css("left","0px");
			})
			.mouseout(function() {
				timeout = setTimeout(function(){
					$(firstDropdown).css("left","-9999px");
					toggleARIAProps(firstDropdown);
				}, 1000);
			}
		);

		// on first menu hover, clear timeout
		$(firstDropdown).mouseover(function() {
				clearTimeout(timeout);
			})
			.mouseout(function(){
				timeout = setTimeout(function(){
					$(firstDropdown).css("left","-9999px");
					toggleARIAProps(firstDropdown);
				}, 1000);
		});

		$(subTriggerDropdown).mouseover(function() {
				toggleARIAProps(secondDropdown);
				$(secondDropdown).css("display","block");
			}).mouseout(function() {
				setTimeout(function(){
					$(secondDropdown).css("display","");
					toggleARIAProps(secondDropdown);
				}, 1000);
			});

	}

	function toggleARIAProps(elem) {
		var elem = elem[0];
		( $(elem).attr("aria-expanded") === "false" ) ? $(elem).attr("aria-expanded","true") : $(elem).attr("aria-expanded","false");
	}

	$(triggerDropdown).on("focusin focusout", function() {
		toggleARIAProps(firstDropdown);
	});

	// on second-level dropdown trigger
	$(subTriggerDropdown).on("focusin focusout", function() {
		toggleARIAProps(secondDropdown);
	});

	// first dropdown first list item hover
	$(subTrigger).focusin(function() {
		$(firstDropdown).css("left","0px");
	})
		// on focus out, trigger sibling focus
		.focusout(function() {
		$(subTriggerSibling).focus();
	});

	// on second list item focus, hide dropdown
	$("ul#navbar > li:nth-child(2) a").focus(function() {	$(firstDropdown).css("left",""); });

	attachMouseEvents();

	/** end of Nav **/


	/*** Mobile Navigation ***/

	var isMenu;
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

	function createMobileMenu() {
		$("#nav-primary").append(hamburger);
		$("#navbar").css("left","0");
		$("#navbar").addClass("collapse").removeClass("navbar-nav");
		$("#navbar > li:first-child > a").attr("href","#").attr("data-toggle","collapse").attr("data-target","#navbar-xs");
		$("#navbar-xs").addClass("collapse").removeClass("dropdown-menu");
		isMenu = true;
	}

	function revertMobileMenu() {
		$("#nav-primary > button").remove();
		$("#navbar").addClass("navbar-nav").removeClass("collapse");
		$("#navbar > li:first-child > a").attr("href","infloor_heat.asp").removeAttr("data-toggle").removeAttr("data-target");
		$("#navbar-xs").removeClass("collapse").addClass("dropdown-menu");
		isMenu = false;
	}

	function detachEvents() {
		$(triggerDropdown, firstDropdown).off("mouseover mouseout");
		// must declare separately .off for subTriggerDropdown
		$(subTriggerDropdown).off("mouseout mouseover");
	}

	function attachEvents() {
		$(triggerDropdown, firstDropdown).on("mouseover mouseout");
	}

	/**
	* If screen is loaded on XS device size
	*/
	window.onload = function() {
		if (window.innerWidth <= 768) {
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
		if (window.innerWidth > 768) {
			if (isMenu) {
				revertMobileMenu();
			}

			attachMouseEvents();

			if (isPhoneIcon) {
				return false;
			} else {
				$("nav > a.call-us").removeClass("full-length");
				$("nav > a.call-us")[0].style.width = "";
				isPhoneIcon = true
			}
		}
	});


	/*** Animate Call Us button ***/

	// marker for phone animation complete */
	var animationComplete = false;
	/* reset marker for phone icon state */
	var isPhoneIcon = false;
	$("nav > a.call-us").on("click", function(e){

		// if animation has run, trigger natural event
		if (animationComplete) {
			animationComplete = false;
			return true;
		}

		e.preventDefault();
		// $(this).find("span").css("color","#f5911f");
		$(this).addClass("full-length")
		.animate({
			width:"264px",
		}, 600, function(){
			animationComplete = true;
			$(e.target).trigger("click");
		});

	});

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

})();
