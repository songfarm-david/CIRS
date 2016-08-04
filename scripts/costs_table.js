/***
* Script: Costs Examples Table (mobile screen size only)
**/

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

	// build the buttons
	var buttons = [];
	for (var i = 0; i < 2; i++) {
		var button = document.createElement("button");
		button.setAttribute("type","button");
		button.setAttribute("aria-hidden","true");
		var span = document.createElement("span");
		span.className = "glyphicon";
		button.insertBefore(span, null);
		buttons[i] = button;
	}
	// define each buttons unique characteristics
	buttons[0].setAttribute("name","previous");
	buttons[0].firstElementChild.className += " glyphicon-chevron-left";
	buttons[1].setAttribute("name","next");
	buttons[1].firstElementChild.className += " glyphicon-chevron-right";
	// attach buttons to DOM
	var parent = $('section[aria-labelledby="cost_examples"]');
	var tableParent = document.getElementById("cost_examples_table").parentElement;
	for (var i = 0; i < buttons.length; i++) {
		parent[0].insertBefore(buttons[i],tableParent);
	}

	function initializeEvents() {
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
	}

	// create a function that cycles through the length of the table and assigns the new index the class of current
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
	// initialize button events
	initializeEvents();
