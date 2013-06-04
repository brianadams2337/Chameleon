$(document).ready(function() {
	var ProductId = "test1";

	$.when(
		/* LOAD JS FILES */
		$.getScript("http://localhost:8888/Chameleon/js/jquery.min.1.9.1.js"),
		$.getScript("http://localhost:8888/Chameleon/js/createHTML5Elements.js"),
		$.getScript("http://localhost:8888/Chameleon/js/browserSelector.js"),
		/* controllers */
		$.getScript("http://localhost:8888/Chameleon/controllers/functionsGlobal.js"),
		$.getScript("http://localhost:8888/Chameleon/controllers/functionsLoadReviews.js"),
		/* models */
		$.getScript("http://localhost:8888/Chameleon/models/varsGlobal.js"),
		$.getScript("http://localhost:8888/Chameleon/models/varsReviews.js"),
		$.getScript("http://localhost:8888/Chameleon/models/apiCallsGlobal.js"),
		$.getScript("http://localhost:8888/Chameleon/models/apiCallsReviews.js"),
		/* plugins */
		$.getScript("http://localhost:8888/Chameleon/js/plugins/jquery.cookie.js"),
		$.getScript("http://localhost:8888/Chameleon/js/plugins/jquery.dateFormat.js"),
		$.getScript("http://localhost:8888/Chameleon/js/plugins/jquery.magnific-popup.js"),
		/* LOAD CSS FILES */
		$("head").append("<link href='http://localhost:8888/Chameleon/css/bazaarvoiceUniversal.css' type='text/css' rel='stylesheet' />"),
		$("head").append("<link href='http://localhost:8888/Chameleon/css/magnific-popup.css' type='text/css' rel='stylesheet' />"),

		$.Deferred(function(deferred){
			$(deferred.resolve);
		})
	).done(function(){

		// load reviews into main container
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
		getReviewsStats (ProductId, function(content) {
			loadQuickTake (content, {
				"productId":ProductId
			});
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