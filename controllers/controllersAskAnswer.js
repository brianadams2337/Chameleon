/* DEFAULT QUESTION & ANSWER FUNCTION */

function loadQuestionAnswer (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionAnswerBodyContainer,
		"viewContainer":defaultQuestionAnswerContainerView,
		"loadOrder":"",
		"productId":"",
		"modelLocalDefaultSettings":""
	}, options);
	// hide the target container while reviews are loading
	$(settings["targetContainer"]).empty().hide();
	// set variables
	//var questionsStatisticsToLoad = content["Includes"]["Products"][settings["productId"]]['ReviewStatistics'];
	var questionsToLoad = content["Results"];
	/*
	// load quick take
	loadQuickTake (reviewsStatisticsToLoad, {
		"productId":settings["productId"]
	});
	*/
	// load questions
	$.when(
		$.each(questionsToLoad, function(key) {
			// get a new id for the QA container using question id - this will be needed for reference on child elements
			var newID = "BVQuestionAnswerContainer" + questionsToLoad[key]["Id"];
			$.ajax({
				url: settings["viewContainer"],
				type: 'GET',
				dataType: 'html',
				async: false,
				success: function(container) {
					var $container = $(container);
					// set string varable with new id to use as reference
					var containerID = "#" + newID + " ";
					// add question answer container
					$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).attr("id", newID));
					// load question answer content
					loadQuestionTitle (questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionBody (questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionDate (questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionUserNickname (questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionUserLocation (questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionContextDataValues (questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionTagGroups(questionsToLoad[key], {
						"parentContainer":$container
					});					
					loadQuestionAdditionalFieldsGroups(questionsToLoad[key], {
						"parentContainer":$container
					});
					loadQuestionPhotos(questionsToLoad[key], {
						"parentContainer":$container
					});
					loadFeedback(questionsToLoad[key], {
						"parentContainer":$container,
						"productId":settings["productId"],
						"contentId":questionsToLoad[key]["Id"],
						"feedbackSettings":{
							"contentType":"question"
						}
					});
				},
				error: function(e) {
					defaultAjaxErrorFunction(e);
				}
			});
		})
	).done(function(){
		// all functions pertaining to questions as a group here
		// show target container once reviews are finished loading
		$(settings["targetContainer"]).show();
		// pagination
		loadNumberedPagination (content, {
			"parentContainer":defaultQuestionAnswerParentContainer,
			"targetContainer":defaultQuestionAnswerBodyContainer,
			"viewReloadOptions":{
				"model":getQuestionsCustom,
				"modelSettings":settings["modelLocalDefaultSettings"],
				"controller":loadQuestionAnswer,
				"controllerSettings":settings
			}
		});
		// remove loading styling (animated gif, etc.)
		$(settings["parentContainer"]).removeClass("_BVContentLoadingContainer");
		// set classes
		addOddEvenClasses (defaultQuestionAnswerContainer);
		addFirstLastClasses (defaultQuestionAnswerContainer);
	});
}

/* QUESTION TEXT DATA */

function loadQuestionTitle (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionTitleContainer,
		"viewContainer":defaultQuestionTitleContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set variables
			var titleTextValue = content['QuestionSummary'];
			// set title value
			$container.find(defaultQuestionTitleTextContainer).andSelf().filter(defaultQuestionTitleTextContainer).text(titleTextValue);
			// add title template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionBody (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionBodyTextContainer,
		"viewContainer":defaultQuestionBodyTextContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set variables
			var bodyTextValue = content['QuestionDetails'];
			// set title value
			$container.find(defaultQuestionBodyTextTextContainer).andSelf().filter(defaultQuestionBodyTextTextContainer).text(bodyTextValue);
			// add title template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionDate (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionDateContainer,
		"viewContainer":defaultQuestionDateContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// format date
			var dateTextValue = $.format.date(content['SubmissionTime'], "MMMM dd, yyyy");
			// set date value
			$container.find(defaultQuestionDateTextContainer).andSelf().filter(defaultQuestionDateTextContainer).text(dateTextValue);
			// add date template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

/* TAGS - (PROS/CONS) */

function loadQuestionTagGroups (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionTagGroupContainer,
		"viewContainer":defaultQuestionTagsContainerView,
		"loadOrder":content["TagDimensionsOrder"],
		"productId":""
	}, options);
	// set content variable to tags
	$.each(settings["loadOrder"], function(index) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// current iteration of loop
				var cur = settings["loadOrder"][index];
				// set variables
				var id = content["TagDimensions"][cur]["Id"];
				var labelText = content["TagDimensions"][cur]["Label"];
				var valuesArray = content["TagDimensions"][cur]["Values"];
				// set class variables
				var labelClass = "BVTags" + id;
				// set tag label (title)
				$container.find(defaultQuestionTagLabelTextContainer).andSelf().filter(defaultQuestionTagLabelTextContainer).text(labelText);
				// add tags container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
				// load tags
				loadQuestionTags (valuesArray, {
					"parentContainer":settings["parentContainer"],
				});
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

function loadQuestionTagIndividual (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionTagGroupContainer,
		"targetContainer":defaultQuestionTagIndividualContainer,
		"viewContainer":defaultQuestionTagContainerView,
		"loadOrder":content,
		"productId":""
	}, options);
	// set content variable to tags
	$.each(settings["loadOrder"], function(index) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// set tag text
				$container.find(defaultQuestionTagTextContainer).andSelf().filter(defaultQuestionTagTextContainer).text(content[index]);
				// add tag container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);				
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

/* USER DATA */

function loadQuestionUserNickname (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionUserNicknameContainer,
		"viewContainer":defaultQuestionUserNicknameContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set variables
			var userNicknameValue = content['UserNickname'];
			// set nickname value
			$container.find(defaultQuestionUserNicknameTextContainer).andSelf().filter(defaultQuestionUserNicknameTextContainer).text(userNicknameValue);
			// add nickname template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionUserLocation (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionUserLocationContainer,
		"viewContainer":defaultQuestionUserLocationContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set variables
			var userLocationValue = content['UserLocation'];
			// set location value
			$container.find(defaultQuestionUserLocationTextContainer).andSelf().filter(defaultQuestionUserLocationTextContainer).text(userLocationValue);
			// add location template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

/* CONTEXT DATA VALUES (CDVs) */

function loadQuestionContextDataValues (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionContextDataValueGroupContainer,
		"viewContainer":defaultQuestionContextDataValueContainerView,
		"loadOrder":content["ContextDataValuesOrder"],
		"productId":""
	}, options);
	$.each(settings["loadOrder"], function(index) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// current iteration of loop
				var cur = settings["loadOrder"][index];
				// set variables
				var id = content["ContextDataValues"][cur]["Id"];
				var value = content["ContextDataValues"][cur]["Value"];
				var valueText = content["ContextDataValues"][cur]["ValueLabel"];
				var labelText = content["ContextDataValues"][cur]["DimensionLabel"];
				// set class variables
				var labelClass = "BVContextDataValue" + id;
				var valueClass = "BVContextDataValue" + value;
				// set CDV label (title)
				$container.find(defaultQuestionContextDataValueLabelTextContainer).andSelf().filter(defaultQuestionContextDataValueLabelTextContainer).text(labelText);
				// set CDV value
				$container.find(defaultQuestionContextDataValueTextContainer).andSelf().filter(defaultQuestionContextDataValueTextContainer).text(valueText);
				// add CDVs container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).addClass(labelClass));
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

/* ADDITIONAL FIELDS */

function loadQuestionAdditionalFieldsGroups (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionAdditionalFieldGroupContainer,
		"viewContainer":defaultQuestionAdditionalFieldContainerView,
		"loadOrder":content["AdditionalFieldsOrder"],
		"productId":""
	}, options);
	$.each(settings["loadOrder"], function(index) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// current iteration of loop
				var cur = settings["loadOrder"][index];
				// set variables
				var id = content["AdditionalFields"][cur]["Id"];
				var value = content["AdditionalFields"][cur]["Value"];
				var valueText = content["AdditionalFields"][cur]["ValueLabel"];
				var labelText = content["AdditionalFields"][cur]["DimensionLabel"];
				// set class variables
				var labelClass = "BVAdditionalFields" + id;
				var valueClass = "BVAdditionalFields" + value;
				// set additional field label (title)
				$container.find(defaultQuestionAdditionalFieldLabelTextContainer).andSelf().filter(defaultQuestionAdditionalFieldLabelTextContainer).text(labelText);
				// set additional field value
				$container.find(defaultQuestionAdditionalFieldTextContainer).andSelf().filter(defaultQuestionAdditionalFieldTextContainer).text(valueText);
				// add additional fields container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).addClass(labelClass));
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

/* MEDIA - PHOTO & VIDEO */

function loadQuestionPhotos (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionPhotoGroupContainer,
		"viewContainer":defaultQuestionPhotoContainerView,
		"loadOrder":content["Photos"],
		"productId":""
	}, options);
	$.each(settings["loadOrder"], function(index) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// current iteration of loop
				var cur = settings["loadOrder"][index];
				// set variables
				var id = cur["Id"];
				var thumbnailId = cur["Sizes"]["thumbnail"]["Id"];
				var thumbnailUrl = cur["Sizes"]["thumbnail"]["Url"];
				var thumbnail = new Image; // thumbnail image
				thumbnail.src = thumbnailUrl; // set thumbnail image src attr
				var photoId = cur["Sizes"]["normal"]["Id"];
				var photoUrl = cur["Sizes"]["normal"]["Url"];
				var photo = new Image; // photo image
				photo.src = photoUrl; // set photo image src attr
				var captionText = cur["Caption"];
				var SizesOrderArray = cur["SizesOrder"];
				// set class variables
				var labelClass = "BVPhoto" + id;
				// set thumbnail
				$container.find(defaultQuestionPhotoThumbnailContainer).andSelf().filter(defaultQuestionPhotoThumbnailContainer).html(thumbnail).attr({"href":photoUrl,"title":captionText});
				// set photo
				//$container.find(defaultQuestionPhotoIndividualContainer).andSelf().filter(defaultQuestionPhotoIndividualContainer).html(photo);
				// set caption
				//$container.find(defaultQuestionPhotoCaptionContainer).andSelf().filter(defaultQuestionPhotoCaptionContainer).text(captionText);
				// add photo container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).addClass(labelClass));
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

function loadQuestionVideos (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerContainer,
		"targetContainer":defaultQuestionVideoGroupContainer,
		"viewContainer":defaultQuestionVideoContainerView,
		"loadOrder":content["Videos"],
		"productId":""
	}, options);
	$.each(settings["loadOrder"], function(index) {
		$.ajax({
			url: settings["viewContainer"],
			type: 'GET',
			dataType: 'html',
			async: false,
			success: function(container) {
				var $container = $(container);
				// current iteration of loop
				var cur = settings["loadOrder"][index];
				// set text variables
				var id = cur["VideoId"];
				var videoHost = cur["VideoHost"];
				var thumbnailUrl = cur["VideoThumbnailUrl"];
				var videoUrl = cur["VideoUrl"];
				var videoiFrameUrl = cur["VideoIframeUrl"];
				var captionText = cur["Caption"];
				console.log(videoUrl);
				var thumbnail = new Image;
				thumbnail.src = thumbnailUrl;
				var video = $("<iframe />");
				video.attr({"src":videoUrl});
				// set class variables
				var labelClass = "BVVideo" + id;
				// set thumbnail
				$container.find(defaultReviewVideoThumbnailContainer).andSelf().filter(defaultReviewVideoThumbnailContainer).html(thumbnail).attr({"href":videoUrl,"title":captionText});
				// set video
				//$container.find(defaultReviewVideoIndividualContainer).andSelf().filter(defaultReviewVideoIndividualContainer).html(video);
				// set caption
				//$container.find(defaultReviewVideoCaptionContainer).andSelf().filter(defaultReviewVideoCaptionContainer).text(captionText);
				// add video container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).addClass(labelClass));
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).addClass(labelClass));
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

