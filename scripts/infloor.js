(function(){

	/*** Navigation ***/
	/*
	* Handles navigation behavior including hover and focus states
	* as well as the inclusion of ARIA states and properties
	*/
	var dropdownTrigger, firstDropdownMenu, secondDropdownMenu;
	var timer_one, timer_two;
	var nav = document.getElementById("nav-primary");
	// jumbotron
	var navSibling = nav.nextElementSibling;
	// get the first li in the top-level unordered list
	dropdownTrigger = $("ul.nav.navbar-nav > li.dropdown > a")[0];
	dropdownTriggerSibling = $("ul.nav.navbar-nav > li.dropdown + li > a")[0];
	// get the first dropdown unordered list
	firstDropdownMenu = $("li.dropdown > ul.dropdown-menu")[0];
	// get the second dropdown unordered list
	secondDropdownMenu = $("ul.dropdown-menu.submenu")[0];

	// set ARIA attributes on both dropdowns
	var dropdownArray = [firstDropdownMenu,secondDropdownMenu];
	dropdownArray.forEach(function(el, i){
		el.setAttribute("aria-haspopup","true");
		el.setAttribute("aria-expanded","false");
	});

	var subDropdownTrigger = $("li.dropdown-submenu > a")[0];
	var subDropdownTriggerSibling = $("ul.dropdown-menu > li.dropdown-submenu + li > a")[0];

	function toggleARIAProps(el) {
		if (el.getAttribute("aria-expanded") == "false") {
			/* NOTE: IE9 does not support classList */
			if (!el.classList) {
				el.className = el.className + " open";
			} else {
				el.classList.add("open");
			}
			el.setAttribute("aria-expanded","true");
		} else {
			if (!el.classList) {
				el.className = el.className.replace(/\b open/g, "");
			} else {
				el.classList.remove("open");
			}
			el.setAttribute("aria-expanded","false");
		}
	}

	/**
	* Delay the closing/hiding of Dropdown menus
	*/
	function delayMenu() {
		// access the menu item
		var theMenu = this.nextElementSibling
		if (this.firstElementChild) {
			theMenu.style.left = 0;
			timer_one = setTimeout(function() {
				toggleARIAProps(theMenu);
				theMenu.style.left = "-9999px";
			}, 850);
		} else {
			secondDropdownMenu.style.display = "block";
			timer_two = setTimeout(function() {
				toggleARIAProps(theMenu);
				secondDropdownMenu.style.display = "";
			}, 850);
		}
	}

	// on focus - main menu dropdown trigger
	// show dropdown menu
	dropdownTrigger.addEventListener("focus", function() {
		firstDropdownMenu.style.left = "0px";
		toggleARIAProps(firstDropdownMenu);
	});

	// on focus - main menu, second list item.
	// hide dropdown menu
	dropdownTriggerSibling.addEventListener("focus", function() {
		firstDropdownMenu.style.left = "";
		toggleARIAProps(firstDropdownMenu);
	});

	// on focus dropdown menu first li
	subDropdownTrigger.addEventListener("focus", function(){
		toggleARIAProps(secondDropdownMenu);
	});

	// on blur dropdown menu first li
	// put focus on SECOND item instantly
	subDropdownTrigger.addEventListener("blur", function(){
		toggleARIAProps(secondDropdownMenu);
		subDropdownTriggerSibling.focus();
	})

	// on MOUSEOVER, main dropdown trigger
	// show dropdown menu
	dropdownTrigger.addEventListener("mouseover", function() {
		toggleARIAProps(firstDropdownMenu);
		firstDropdownMenu.style.left = "0px";
	});
	// on mouseout, hide the dropdown menu
	dropdownTrigger.addEventListener("mouseout", function() {
		toggleARIAProps(firstDropdownMenu);
		firstDropdownMenu.style.left = "";
	});

	// on mouseover - SUB dropdown menu
	// show the submenu
	subDropdownTrigger.addEventListener("mouseover", function() {
		toggleARIAProps(secondDropdownMenu);
	})
	subDropdownTrigger.addEventListener("mouseout", function() {
		toggleARIAProps(secondDropdownMenu);
	})

	dropdownTrigger.addEventListener("mouseout", delayMenu, false);
	subDropdownTrigger.addEventListener("mouseout",delayMenu, false);

	// clear the timer intervals (closing/hiding behavior) on elements mouseover
	firstDropdownMenu.addEventListener("mouseover", function() {clearTimeout(timer_one);})
	secondDropdownMenu.addEventListener("mouseover", function() {clearTimeout(timer_two);})

	// on jumbotron mouseover, close/hide dropdown
	navSibling.addEventListener("mouseover", function() {
		timer = setTimeout(function() {
			toggleARIAProps(firstDropdownMenu);
			firstDropdownMenu.style.left = "-9999px";
		}, 500);
	}, true);

	/** end of navigation **/

	/*** Mobile Navigation ***/

	// create the hamburger menu
	var hamburger = document.createElement("button");
	hamburger.setAttribute("type","button");
	hamburger.className = "navbar-toggle";
	hamburger.setAttribute("data-toggle","collapse");
	hamburger.setAttribute("data-target","#navbar-xs");
	// add the vertical lines 3 times
	for (var i = 0; i < 3; i++) {
		// create vertical lines
		var iconBar = document.createElement("span");
		iconBar.className = "icon-bar";
		hamburger.appendChild(iconBar);
	}

	// create the parent wrapper:
	var wrapper = document.createElement("div");
	wrapper.id = "navbar-xs";
	wrapper.className = "collapse navbar-collapse";
	// get handle to top-level dropdown menu
	var TLDropdown = dropdownTrigger.parentElement.parentElement;
	var isMenu;

	/**
	* If screen is loaded on XS device size
	*/
	window.onload = function() {
		if (window.innerWidth <= 768) {
			// append the hamburger icon to primary nav
			nav.appendChild(hamburger);
			// wrap the top-level dropdown menu in parent wrapper
			$(TLDropdown).wrap(wrapper);
			// set isMenu boolean
			isMenu = true;

			// remove hover event listeners
			dropdownTrigger.removeEventListener("mouseout", delayMenu);
			subDropdownTrigger.removeEventListener("mouseout", delayMenu);
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
				// append hamburger icon to primary nav
				nav.appendChild(hamburger);
				// wrap the top-level dropdown menu in parent wrapper
				$(TLDropdown).wrap(wrapper);
				// set isMenu boolean
				isMenu = true;

				// remove hover event listeners
				dropdownTrigger.removeEventListener("mouseout", delayMenu);
				subDropdownTrigger.removeEventListener("mouseout", delayMenu);
			}
			// remove any hover event listeners
		}
		if (window.innerWidth > 768) {
			if (isMenu) {
				// remove hamburger icon from primary nav
				nav.removeChild(hamburger);
				// unwrap top-level dropdown menu
				$(TLDropdown).unwrap(wrapper);
				// set isMenu boolean to false
				isMenu = false;

				// add hover events back
				dropdownTrigger.addEventListener("mouseout", delayMenu);
				subDropdownTrigger.addEventListener("mouseout", delayMenu);
			}
		}
	});

	/**
	* Animate text fade in
	*/
	$(wrapper).on("show.bs.collapse", function(){
		// animate text fade in here
	});

	/** end of Mobile Nav **/

	/*** Img Pop-Out ***/

	// create a virtual modal element
	var modal = document.createElement("div");
	modal.className = "modal fade";
	modal.innerHTML =
	"<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button></div><div class=\"modal-body\"></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div>";
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

				/* optional: add extra width to account for styled padding */
				// modal.firstElementChild.style.width = imgWidth + 60 + "px";

				// fire the modal
				$(modal).modal();

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
