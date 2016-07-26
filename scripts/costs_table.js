
	// create an array of table columns i.e: <col> tags
	var columns = $(".table colgroup > col").toArray();

	// get all the thead th's, tbody td's, tfoot td's (table components) and put them into an array
	var tableComps = $(".table thead th, .table tbody td, .table tfoot td").toArray();
	// pop off the last <td> in the table as it is discretionary and unrelated to functional presentation
	tableComps.pop();

	// set the starting index
	for (var i = 0; i < columns.length; i++) {
		if (columns[i].className == "current") {
			index = i;
		}
	}

	/* NOTE: use of '-1' to accomodate 0-index */
	$("button[name=\"previous\"]").on("click", function() {
		$(columns[index]).removeClass("current");
		if (index == 0) {
			index = columns.length - 1;
		} else {
			index--;
		}
		$(columns[index]).addClass("current");
		rotatePanel();
	});

	$("button[name=\"next\"]").on("click", function() {
		$(columns[index]).removeClass("current");
		if (index == (columns.length - 1) ) {
			index = 0;
		} else {
			index++;
		}
		$(columns[index]).addClass("current");
		rotatePanel();
	});

	// create a function that cycles through the lenght of the table and assigns the new index the class of current
	function rotatePanel() {
		var panelIndex = index;
		for (var i = 0; i < tableComps.length; i++) {
			if (panelIndex == i) {
				tableComps[i].className = "current";
				panelIndex += columns.length
			} else {
				tableComps[i].className = "";
			}
		}
	}

	// initialize first panel
	rotatePanel();
