<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="robots" content="noindex,nofollow">
		<title><?php
			echo (isset($pageTitle)) ?
			ucwords(htmlspecialchars($pageTitle)) . ' &mdash; Canadian In-Floor Radiant Solutions' :
			'Canadian In-Floor Radiant Solutions'; ?></title>
		<meta name="description" content=<?php
			echo (isset($pageDescription)) ?
			htmlspecialchars($pageDescription) :
			"In floor heating offers many benefits. Learn about hydronic infloor heat from experts serving Toronto and Southern Ontario."; ?>
		>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<link rel="stylesheet" href="css/global.css">
		<?php if (pathinfo(basename($_SERVER['PHP_SELF']))['filename'] == 'index') { ?>
			<link rel="stylesheet" href="css/home.css"><?php } ?>
		<?php if (pathinfo(basename($_SERVER['PHP_SELF']))['filename'] == 'cost_examples') { ?>
			<link rel="stylesheet" href="css/cost_examples.css"><?php } ?>
		<?php include("includes/browser_detect.php"); ?>
	</head>
	<body>
		<!-- For document outline -->
		<h1 class="hidden">Canadian In-Floor Radiant Solutions</h1>
		<div class="wrapper container">
