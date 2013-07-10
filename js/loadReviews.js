$(document).ready(function() {
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
			$.getScript(siteBaseURL + "controllers/controllersGlobal.js"),
			$.getScript(siteBaseURL + "controllers/controllersReviews.js"),
			$.getScript(siteBaseURL + "controllers/controllersAskAnswer.js"),
			$.getScript(siteBaseURL + "controllers/controllersFeedback.js"),
			/* models */
			$.getScript(siteBaseURL + "models/varsTemplates.js"),
			$.getScript(siteBaseURL + "models/varsReviews.js"),
			$.getScript(siteBaseURL + "models/varsAskAnswer.js"),
			$.getScript(siteBaseURL + "models/varsFeedback.js"),
			$.getScript(siteBaseURL + "models/modelsGlobal.js"),
			$.getScript(siteBaseURL + "models/modelsReviews.js"),
			$.getScript(siteBaseURL + "models/modelsAskAnswer.js"),
			$.getScript(siteBaseURL + "models/modelsFeedback.js"),
			/* plugins */
			$.getScript(siteBaseURL + "js/plugins/jquery.cookie.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.dateFormat.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.magnific-popup.js"),
			$.getScript(siteBaseURL + "js/plugins/jquery.bvPagination.js"),
			/* LOAD CSS FILES */
			$("head").append("<link href='" + siteBaseURL + "css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
			$("head").append("<link href='" + siteBaseURL + "css/magnific-popup.css' type='text/css' rel='stylesheet' />"),

			$.Deferred(function(deferred){
				$(deferred.resolve);
			})
		).done(function(){

			// load reviews
			getAllReviews (productId, function(content, modelLocalDefaultSettings) {
				// callback function
				loadReviews (content, {
					"productId":productId,
					"modelLocalDefaultSettings":modelLocalDefaultSettings
				});
			}, {
				// api parameters
				"Parameters":{
					"Filter":{
						//"IsFeatured":false,
						//"HasPhotos":true
					}
				}
			});

			// ask & answer
			getAllQuestionsAnswers (productId, function(content, modelLocalDefaultSettings) {
				// callback function
				loadQuestionAnswer (content, {
					"productId":productId,
					"modelLocalDefaultSettings":modelLocalDefaultSettings
				});
			}, {
				// api parameters
				"Parameters":{
					"Filter":{
						//"IsFeatured":false,
						//"HasPhotos":true
					}
				}
			});

			/* MAGNIFIC LIGHTBOX POPIN */
			// photos
			$('#BVRRContainer').on('click', '._BVPhotoThumbnail', function() {
				event.preventDefault();
				$(this).magnificPopup({
					type: 'image',
					titleSrc: 'title'
				}).click();
			});
			// videos
			$('#BVRRContainer').on('click', '._BVVideoThumbnail', function() {
				event.preventDefault();
				$(this).magnificPopup({
					type: 'iframe',
					titleSrc: 'title'
				}).click();
			});
			// photos
			$('#BVQAContainer').on('click', '._BVPhotoThumbnail', function() {
				event.preventDefault();
				$(this).magnificPopup({
					type: 'image',
					titleSrc: 'title'
				}).click();
			});
			// videos
			$('#BVQAContainer').on('click', '._BVVideoThumbnail', function() {
				event.preventDefault();
				$(this).magnificPopup({
					type: 'iframe',
					titleSrc: 'title'
				}).click();
			});
		});
	});
});