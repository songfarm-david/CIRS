(function(){

	/*** Navigation ***/
	/*
	* Handles navigation behavior including hover and focus states
	* as well as the inclusion of ARIA states and properties
	*/
	var targetElement, dropdownMenu, subDropdownMenu;
	var dropMenus = [];
	var timer;
	// target all children of primary nav
	var navChildren = document.getElementById("nav-primary").children;
	// cycle through children of navigation for ul element
	for (var i = 0; i < navChildren.length; i++) {
		if (navChildren[i].nodeName == "UL") {
			// get the first element child of the first element child (the a tag)
			targetElement = navChildren[i].firstElementChild.firstElementChild;
			// get the next sibling of the <a> tag (the dropdown menu)
			dropdownMenu = targetElement.nextElementSibling;
			// get the second dropdown menu
			subDropdownMenu = dropdownMenu.firstElementChild.lastElementChild;

			// loop through both dropdown menus and assign aria properties
			dropMenus = [dropdownMenu,subDropdownMenu];
			dropMenus.forEach(function(el, i){
				el.setAttribute("aria-haspopup","true");
				el.setAttribute("aria-expanded","false");
			});
		}
	} // end of for loop

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
	* When the trigger list item loses focus, position the dropdown menu in viewport
	* When the first item of dropdown menu loses focus, give focus to second list item in dropdown
	*/
	targetElement.addEventListener("focus", function() {
		toggleARIAProps(this.nextElementSibling);
		// position element in viewport
		dropdownMenu.style.left = "0px";
		// target dropdown menus first <li>
		dropdownMenu.firstElementChild.firstElementChild.addEventListener("blur", function() {
			// on focusout, move focus to next sibling
			this.parentElement.nextElementSibling.firstElementChild.focus();
			toggleARIAProps(subDropdownMenu);
		}, false);
	}, false);

	targetElement.addEventListener("mouseover", function() {
		toggleARIAProps(this.nextElementSibling);
		this.nextElementSibling.style.left = "";
	}, true);

	["focus","mouseover"].forEach(function(el,i){
		// target first list item of dropdown
		dropdownMenu.firstElementChild.addEventListener(el, function() {
			toggleARIAProps(dropdownMenu.firstElementChild.lastElementChild);
		}, true);
	});

	targetElement.addEventListener("mouseout", function() {
		this.nextElementSibling.style.left = 0;
		timer = setTimeout(function() {
			toggleARIAProps(targetElement.nextElementSibling);
			targetElement.nextElementSibling.style.left = "-9999px";
		}, 850);
	}, false);

	// console.log(subDropdownMenu.parentElement);
	subDropdownMenu.parentElement.addEventListener("mouseout", function() {
			subDropdownMenu.style.display = "block";
		setTimeout(function() {
			toggleARIAProps(subDropdownMenu);
			subDropdownMenu.style.display = "";
		}, 850);
	}, true);

	dropdownMenu.addEventListener("mouseover", function() {
		// if mouseover first drop down menu, cancel timer function
		clearTimeout(timer);
	}, true);

	// on focus targets' adjacent list item ('What does it cost?')
	targetElement.parentElement.nextElementSibling.addEventListener("focus", function() {
		dropdownMenu.style.left = -9999+"px";
		toggleARIAProps(targetElement.nextElementSibling);
	}, true);

	/** end of navigation **/

	/*** Detect IE Browser Version ***/
	// NOTE: Browser is global variable
		// if using less than IE9
		if (Browser.isIE && Browser.version < 9) {
			// console.log(Browser.version);
			return false;
		}
		// if IE9
		else if (Browser.isIE && Browser.version == 9) {
			// console.log(Browser.version);
			// load fallback script
			$.getScript("scripts/bootstrapCarouselIE.js");
			return false;
		}

})();
