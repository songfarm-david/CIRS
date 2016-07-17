(function(){

	// Main Navigation
	// On hover, expand dropdown menu(s) and set aria attributes
	var li = document.getElementById("nav-primary").getElementsByTagName("li");
	function dropdownHandler(el) {
		el.addEventListener("focus", function(){
			this.lastElementChild.style.display = "block";
		}, true);
		["focus","mouseover"].forEach(function(evt){
			li[i].nextElementSibling.addEventListener(evt, function(){
				this.previousElementSibling.lastElementChild.style.display = "";
			},true);
		});
	}
	for (var i = 0; i < li.length; i++) {
		if (li[i].className == "dropdown") {
			dropdownHandler(li[i]);
		} else if (li[i].className == "dropdown-submenu") {
			dropdownHandler(li[i]);
		}
	} // end of for

})();
