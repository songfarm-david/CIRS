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
			// create a new text node and populate with title of default
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
