<?php

	$url = "http://stg.api.bazaarvoice.com/data/submitfeedback.json";
	$defaultParams = array();

	$fields = array_keys($_POST);

	foreach ($fields as $key => $value) {
		$defaultParams[$value] = $_POST[$value];
	}

	$defaultParams = http_build_query($defaultParams);

	$h = curl_init();

	curl_setopt($h, CURLOPT_URL, $url);
	curl_setopt($h, CURLOPT_POST, true);
	curl_setopt($h, CURLOPT_POSTFIELDS, $defaultParams);
	curl_setopt($h, CURLOPT_HEADER, false);
	curl_setopt($h, CURLOPT_RETURNTRANSFER, 1);

	$result = curl_exec($h);
	echo $result;

	curl_close($h);

?>