<?php
$homeURL = 'https://cirs.peakwebsites.ca/';
?>
<script>var Browser = {isIE:false};</script>
<!--[if lt IE 9]>
	<noscript style="position: fixed; top: 0px; left: 0px; z-index: 300000; height: 100%; width: 100%; background-color: #FFFFFF; overflow: hidden;">
			<p style="padding: 45px 75px; border: 5px ridge blue; display: block; width: 650px; margin: 4em auto; font-size: 1.5em; line-height: 1.44; overflow: hidden; text-align: center;">
				<b>You have Javascript turned off.</b><br><br> Please enable JavaScript in your browser to continue viewing this site.
			</p>
	</noscript>
	<script>
		Browser = {
			isIE: true,
			version: 8
		};
		if (Browser.isIE) {
			window.location.replace(<?php echo $homeURL . 'notice_ie.php'; ?>); }
	</script>
<![endif]-->
<!--[if IE 9]>
	<link rel="stylesheet" href="css/ie_styles.css" media="screen">
<![endif]-->
