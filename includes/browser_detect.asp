<!-- Create a 'Browser' global variable for Browser detection purposes -->
<script>var Browser = {isIE:false};</script>
<!-- Legacy browser support -->
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
	<noscript style="position: fixed; top: 0px; left: 0px; z-index: 300000; height: 100%; width: 100%; background-color: #FFFFFF; overflow: hidden;">
			<p style="padding: 45px 75px; border: 5px ridge blue; display: block; width: 650px; margin: 4em auto; font-size: 1.5em; line-height: 1.44; overflow: hidden; text-align: center;">
				<b>You have Javascript turned off.</b><br><br> Please enable JavaScript in your browser to continue viewing this site.
			</p>
	</noscript>
	<script>
	Browser = {isIE:true,version:8};
	if (Browser.isIE) {
		window.location.replace('http://cirs.songfarm.ca/notice_ie.asp');
	}
	</script>
<![endif]-->
<!--[if IE 9]>
	<script>Browser = {isIE:true,version:9};</script>
	<link rel="stylesheet" href="css/ie_styles.css" media="screen">
<![endif]-->
