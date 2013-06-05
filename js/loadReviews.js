$(document).ready(function() {
	var ProductId = "test1";
	$.when(
		// global variables
		$.getScript("models/varsGlobal.js")
	).done(function(){
		$.when(
			/* LOAD JS FILES */
			$.getScript(siteBaseURL + "js/jquery.min.1.9.1.js"),
			$.getScript(siteBaseURL + "js/createHTML5Elements.js"),
			$.getScript(siteBaseURL + "js/browserSelector.js"),
			/* controllers */
			$.getScript(siteBaseURL + "controllers/functionsGlobal.js"),
			$.getScript(siteBaseURL + "controllers/functionsLoadReviews.js"),
			$.getScript(siteBaseURL + "controllers/functionsLoadAskAnswer.js"),
			/* models */
			$.getScript(siteBaseURL + "models/varsReviews.js"),
			$.getScript(siteBaseURL + "models/varsAskAnswer.js"),
			$.getScript(siteBaseURL + "models/apiCallsGlobal.js"),
			$.getScript(siteBaseURL + "models/apiCallsReviews.js"),
			$.getScript(siteBaseURL + "models/apiCallsAskAnswer.js"),
			/* plugins */
			$.getScript(siteBaseURL + "js/plugins/jquery.cookie.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.dateFormat.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.magnific-popup.js"),
			/* LOAD CSS FILES */
			$("head").append("<link href='" + siteBaseURL + "css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
			$("head").append("<link href='" + siteBaseURL + "css/magnific-popup.css' type='text/css' rel='stylesheet' />"),

			$.Deferred(function(deferred){
				$(deferred.resolve);
			})
		).done(function(){

			// load reviews
			getAllReviews (ProductId, function(content) {
				loadReviews (content, {
					"productId":ProductId
				});
			}, {
				"Parameters":{
					"Filter":{
						//"IsFeatured":false,
						//"HasPhotos":true
					}
				}
			});
			// load quick take
			getReviewsStats (ProductId, function(content) {
				loadQuickTake (content, {
					"productId":ProductId
				});
			});

			getAllQuestionsAnswers (ProductId, function(content) {
				loadQuestionAnswer (content, {
					"productId":ProductId
				});
			}, {
				"Parameters":{
					"Filter":{
						//"IsFeatured":false,
						//"HasPhotos":true
					}
				}
			});

			/* MAGNIFIC LIGHTBOX POPIN */
			// photos
			$('._BVContentContainer').on('click', '._BVPhotoThumbnail', function() {
				event.preventDefault();
				$(this).magnificPopup({
					type: 'image',
					titleSrc: 'title'
				}).click();
			});
			// videos
			$('._BVContentContainer').on('click', '._BVVideoThumbnail', function() {
				event.preventDefault();
				$(this).magnificPopup({
					type: 'iframe',
					titleSrc: 'title'
				}).click();
			});
		});
	});
});