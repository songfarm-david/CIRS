		﻿<footer id="footer" class="container-fluid full-width">
			<div class="row">
				<div>
					<ul class="nav navbar-nav" aria-label="Secondary Navigation">
						<li><a href="index.php">Home</a></li>
						<li><a href="about_us.php">About Us</a></li>
						<li><a href="contact_us.php">Contact Us</a></li>
						<li><a href="sitemap.php">Site Map</a></li>
					</ul>
				</div>
			</div>
			<div class="row">
				<div class="text-center">
					<p>
						&copy; 2016 Canadian In-Floor Radiant&nbsp;Solutions
					</p>
				</div>
			</div>
		</footer>
		<!-- end of Wrapper Container -->
		</div>
		<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		<script src="scripts/nav.js"></script>
		<script src="scripts/modal.js"></script>
		<?php if (pathinfo(basename($_SERVER['PHP_SELF']))['filename'] == 'index') { ?>
			<script src="scripts/carousel.js"></script>
		<?php } ?>
		<?php if (pathinfo(basename($_SERVER['PHP_SELF']))['filename'] == 'cost_examples') { ?>
			<script src="scripts/costs_table.js"></script>
		<?php } ?>
	</body>
</html>
