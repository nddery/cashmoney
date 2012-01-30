<!doctype html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <title>cashmoney -&gt; NHL players plus/minus &amp; salary visualization</title>
  <meta name="description" content="">
  <meta name="author" content="Nicolas Duvieusart Dery">

  <meta name="viewport" content="width=device-width,initial-scale=1">

  <!-- CSS concatenated and minified via ant build script-->
  <link rel="stylesheet" href="css/style.css">
  <!-- end CSS-->

<script src="js/libs/modernizr-2.0.6.min.js"></script>
</head>

<body>
	<div id="container">
		<header>
			<h1>
				<a href="#" title="cashmoney: visualizing the national hockey league">
					cashmoney<span class="tagline">visualizing the national hockey league</span>
				</a>
			</h1>
		</header>


		<div id="main" role="main">
			<div id="cashmoney">
				<!-- <div id="playersinfo"></div> -->
			</div>
			<!-- <canvas id="cashmoney" width="900" height="900"> -->
			<!-- 	You browser does not support the canvas element, you should consider updating! -->
			<!-- </canvas> -->
		</div>

		<footer>
			<ul class="inline">
				<li class="separator"><a href="about.html" title="About cashmoney">About</a></li>
				<li>Built with <a href="http://raphaeljs.com/" title="Got to Raphaeljs.com">Raphael.js</a></li>
				<li class="attribution">Created by <a class="nobold" href="http://duvieusart.net" title="Nicoals Duvieusart Dery">Nicolas Duvieusart D&eacute;ry</a></li>
			</ul>
			<p class="floatright">Data updated on 01/15/2012</p>
		</footer>
	</div> <!--! end of #container -->


	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.6.2.min.js"><\/script>')</script>

	<script defer src="js/libs/raphael.min.js"></script>
	<!-- scripts concatenated and minified via ant build script-->
	<script defer src="js/plugins.js"></script>
	<script defer src="js/cashmoney.js"></script>
	<!-- end scripts-->

	<script> // Change UA-XXXXX-X to be your site's ID
	window._gaq = [['_setAccount','UAXXXXXXXX1'],['_trackPageview'],['_trackPageLoadTime']];
	Modernizr.load({
		load: ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js'
	});
	</script>

	<!--[if lt IE 7 ]>
	<script src="//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js"></script>
	<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
	<![endif]-->
</body>
</html>
