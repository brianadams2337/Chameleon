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
		// global variables
		$.getScript("models/varsGlobal.js")
	).done(function(){
		$.when(
			/* LOAD JS FILES */
			$.getScript(siteBaseURL + "js/jquery.min.1.9.1.js"),
			$.getScript(siteBaseURL + "js/createHTML5Elements.js"),
			/* controllers */
			$.getScript(siteBaseURL + "controllers/controllersGlobal.js"),
			$.getScript(siteBaseURL + "controllers/controllersSubmission.js"),
			/* models */
			$.getScript(siteBaseURL + "models/varsTemplates.js"),
			$.getScript(siteBaseURL + "models/varsGlobal.js"),
			$.getScript(siteBaseURL + "models/varsReviews.js"),
			$.getScript(siteBaseURL + "models/varsSubmission.js"),
			$.getScript(siteBaseURL + "models/modelsGlobal.js"),
			$.getScript(siteBaseURL + "models/modelsReviewsSubmission.js"),
			/* plugins */
			$.getScript(siteBaseURL + "js/plugins/jquery.cookie.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.dateFormat.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.magnific-popup.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.rating.js"),
			$.getScript(siteBaseURL + "js/plugins/Parsley.js-1.1.16/parsley.js"),
			/* LOAD CSS FILES */
			$("head").append("<link id='' href='" + siteBaseURL + "css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
			$("head").append("<link id='' href='" + siteBaseURL + "css/magnific-popup.css' type='text/css' rel='stylesheet' />"),

			$.Deferred(function(deferred){
				$(deferred.resolve);
			})
		).done(function(){

			// load review submission container
			getReviewsSubmissionForm(urlParameters["productId"], function(content) {
				loadReviewSubmissionForm(content, {
					"productId":urlParameters["productId"],
					"returnURL":urlParameters["returnURL"]
				});
			});

		});
	});
});