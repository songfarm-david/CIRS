(function(){

	/*** Desktop Navigation ***/

	// dropdown triggers
	var triggerDropdown = $("li.dropdown");
	var subTriggerDropdown = $("li.dropdown-submenu");
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

	function toggleARIAProps(elem) {
		( $(elem).attr("aria-expanded") === "false" ) ? $(elem).attr("aria-expanded","true") : $(elem).attr("aria-expanded","false");
	}

	$(triggerDropdown).on("focusin focusout", function() {
		toggleARIAProps(firstDropdown);
	});

	$(triggerDropdown).mouseover(function() {
			toggleARIAProps(firstDropdown);
			$(firstDropdown).css("left","0px");
		})
		.mouseout(function() {
			toggleARIAProps(firstDropdown);

			timeout = setTimeout(function(){
				$(firstDropdown).css("left","-9999px");
			}, 1000);

		}
	);

	// on first menu hover, clear timeout
	$(firstDropdown).mouseover(function() {	clearTimeout(timeout); });

	// on second-level dropdown trigger
	$(subTriggerDropdown).on("focusin focusout", function() {
		toggleARIAProps(secondDropdown);
	});

	$(subTriggerDropdown).mouseover(function() {
			toggleARIAProps(secondDropdown);
			$(secondDropdown).css("display","block");
		}
	)
	.mouseout(function() {
			toggleARIAProps(secondDropdown);

			setTimeout(function(){
				$(secondDropdown).css("display","");
			}, 1000);

		}
	)

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

	/**
	* If screen is loaded on XS device size
	*/
	window.onload = function() {
		if (window.innerWidth <= 768) {
			createMobileMenu();
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
			// remove any hover event listeners
		}
		if (window.innerWidth > 768) {
			if (isMenu) {
				revertMobileMenu();
			}
		}
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
