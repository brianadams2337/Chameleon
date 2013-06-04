$(document).ready(function() {
	var urlParameters = (function() {
		var result = {};
	    if (window.location.search) {
			// split up the query string and store in an associative array
			var params = window.location.search.slice(1).split("&");
			console.log (params);
			for (var i = 0; i < params.length; i++) {
				var obj = params[i].split("=");
				result[obj[0]] = unescape(obj[1]);
			}
		}
	    return result;
	}());

	$.when(
		/* LOAD JS FILES */
		$.getScript("http://localhost:8888/Chameleon/js/jquery.min.1.9.1.js"),
		$.getScript("http://localhost:8888/Chameleon/js/createHTML5Elements.js"),
		/* controllers */
		$.getScript("http://localhost:8888/Chameleon/controllers/functionsGlobal.js"),
		$.getScript("http://localhost:8888/Chameleon/controllers/functionsLoadSubmission.js"),
		/* models */
		$.getScript("http://localhost:8888/Chameleon/models/varsGlobal.js"),
		$.getScript("http://localhost:8888/Chameleon/models/varsReviews.js"),
		$.getScript("http://localhost:8888/Chameleon/models/apiCallsGlobal.js"),
		$.getScript("http://localhost:8888/Chameleon/models/apiCallsReviewsSubmission.js"),
		/* plugins */
		$.getScript("http://localhost:8888/Chameleon/js/plugins/jquery.cookie.js"),
		$.getScript("http://localhost:8888/Chameleon/js/plugins/jquery.dateFormat.js"),
		$.getScript("http://localhost:8888/Chameleon/js/plugins/jquery.magnific-popup.js"),
		/* LOAD CSS FILES */
		$("head").append("<link id='' href='http://localhost:8888/Chameleon/css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
		$("head").append("<link id='' href='http://localhost:8888/Chameleon/css/magnific-popup.css' type='text/css' rel='stylesheet' />"),

		$.Deferred(function(deferred){
			$(deferred.resolve);
		})
	).done(function(){

		// load reviews into submission container
		getReviewsSubmissionForm(urlParameters["productId"], function(content) {
			loadReviewSubmissionForm(content, {
				"productId":urlParameters["productId"],
				"returnURL":urlParameters["returnURL"]
			});
		});

	});
});