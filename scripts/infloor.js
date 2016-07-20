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
		/*
		* if (figureSet[i].getAttribute("data-pop-out")) {}
		*/

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

			/* End of If here */

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
