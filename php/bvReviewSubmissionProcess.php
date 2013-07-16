<?php

	$defaults = array();

	$fields = array_keys($_POST);

	foreach ($fields as $key => $value) {
		$defaults[$value] = $_POST[$value];
	}

	$defaults = http_build_query($defaults);

	$h = curl_init();

	curl_setopt($h, CURLOPT_URL, "http://stg.api.bazaarvoice.com/data/submitreview.json");
	curl_setopt($h, CURLOPT_POST, true);
	curl_setopt($h, CURLOPT_POSTFIELDS, $defaults);
	curl_setopt($h, CURLOPT_HEADER, false);
	curl_setopt($h, CURLOPT_RETURNTRANSFER, 1);

	$result = curl_exec($h);
	echo $result;

	curl_close($h);

?>