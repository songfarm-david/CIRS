<!-- Create a 'Browser' global variable for Browser detection purposes -->
<script>var Browser = {isIE:false};</script>
<!-- Legacy browser support -->
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
	<script>Browser = {isIE:true,version:8};</script>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<!--[if IE 9]>
	<script>Browser = {isIE:true,version:9};</script>
<![endif]-->
