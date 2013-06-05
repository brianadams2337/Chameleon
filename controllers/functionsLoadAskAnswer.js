/* DEFAULT QUESTION & ANSWER FUNCTION */

function loadQuestionAnswer (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionAnswerBodyContainer,
		"viewContainer":defaultQuestionAnswerContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$(settings["targetContainer"]).hide();
	$.when(
		$.each(content, function(key) {
			// get a new id for the QA container using question id - this will be needed for reference on child elements
			var newID = "BVQuestionAnswerContainer" + content[key]["Id"];
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
					loadQuestionTitle (content[key], {
						"parentContainer":$container
					});
					loadQuestionBody (content[key], {
						"parentContainer":$container
					});
					loadQuestionDate (content[key], {
						"parentContainer":$container
					});
					loadQuestionUserNickname (content[key], {
						"parentContainer":$container
					});
					loadQuestionUserLocation (content[key], {
						"parentContainer":$container
					});
					loadQuestionContextDataValues (content[key], {
						"parentContainer":$container
					});
					loadQuestionTagGroups(content[key], {
						"parentContainer":$container
					});					
					loadQuestionAdditionalFieldsGroups(content[key], {
						"parentContainer":$container
					});
					loadQuestionPhotos(content[key], {
						"parentContainer":$container
					});
					loadQuestionFeedback(content[key], {
						"parentContainer":$container
					});
				},
				error: function(e) {
					defaultAjaxErrorFunction(e);
				}
			});
		})
	).done(function(){
		$(settings["targetContainer"]).show();
		$(settings["parentContainer"]).removeClass("_BVContentLoadingContainer");
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
			async: true,
			success: function(container) {
				var $container = $(container);
				// set text variables
				var id = content["TagDimensions"][settings["loadOrder"][index]]["Id"];
				var labelText = content["TagDimensions"][settings["loadOrder"][index]]["Label"];
				var valuesArray = content["TagDimensions"][settings["loadOrder"][index]]["Values"];
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

function loadQuestionTags (content, options) {
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
				// set text variables
				var id = content["ContextDataValues"][settings["loadOrder"][index]]["Id"];
				var value = content["ContextDataValues"][settings["loadOrder"][index]]["Value"];
				var valueText = content["ContextDataValues"][settings["loadOrder"][index]]["ValueLabel"];
				var labelText = content["ContextDataValues"][settings["loadOrder"][index]]["DimensionLabel"];
				// set class variables
				var labelClass = "BVContextDataValue" + id;
				var valueClass = "BVContextDataValue" + value;
				// set CDV label (title)
				$container.find(defaultQuestionContextDataValueLabelTextContainer).andSelf().filter(defaultQuestionContextDataValueLabelTextContainer).text(labelText);
				// set rating value
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
				// set text variables
				var id = content["AdditionalFields"][settings["loadOrder"][index]]["Id"];
				var value = content["AdditionalFields"][settings["loadOrder"][index]]["Value"];
				var valueText = content["AdditionalFields"][settings["loadOrder"][index]]["ValueLabel"];
				var labelText = content["AdditionalFields"][settings["loadOrder"][index]]["DimensionLabel"];
				// set class variables
				var labelClass = "BVAdditionalFields" + id;
				var valueClass = "BVAdditionalFields" + value;
				// set CDV label (title)
				$container.find(defaultQuestionAdditionalFieldLabelTextContainer).andSelf().filter(defaultQuestionAdditionalFieldLabelTextContainer).text(labelText);
				// set rating value
				$container.find(defaultQuestionAdditionalFieldTextContainer).andSelf().filter(defaultQuestionAdditionalFieldTextContainer).text(valueText);
				// add CDVs container template
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
			async: true,
			success: function(container) {
				var $container = $(container);
				// set text variables
				var id = content["Photos"][index]["Id"];
				var thumbnailId = content["Photos"][index]["Sizes"]["thumbnail"]["Id"];
				var thumbnailUrl = content["Photos"][index]["Sizes"]["thumbnail"]["Url"];
				var thumbnail = new Image;
				thumbnail.src = thumbnailUrl;
				var photoId = content["Photos"][index]["Sizes"]["normal"]["Id"];
				var photoUrl = content["Photos"][index]["Sizes"]["normal"]["Url"];
				var photo = new Image;
				photo.src = photoUrl;
				var captionText = content["Photos"][index]["Caption"];
				var SizesOrderArray = content["Photos"][index]["SizesOrder"];
				// set class variables
				var labelClass = "BVPhoto" + id;
				// set thumbnail
				$container.find(defaultQuestionPhotoThumbnailContainer).andSelf().filter(defaultQuestionPhotoThumbnailContainer).html(thumbnail).attr({"href":photoUrl,"title":captionText});
				// set photo
				//$container.find(defaultQuestionPhotoIndividualContainer).andSelf().filter(defaultQuestionPhotoIndividualContainer).html(photo);
				// set caption
				//$container.find(defaultQuestionPhotoCaptionContainer).andSelf().filter(defaultQuestionPhotoCaptionContainer).text(captionText);
				// add CDVs container template
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
			async: true,
			success: function(container) {
				var $container = $(container);
				// set text variables
				var id = content["Video"][index]["Id"];
				var thumbnailId = content["Video"][index]["Sizes"]["thumbnail"]["Id"];
				var thumbnailUrl = content["Video"][index]["Sizes"]["thumbnail"]["Url"];
				var thumbnail = $("<iframe />");
				thumbnail.attr({"src":thumbnailUrl});
				var videoId = content["Video"][index]["Sizes"]["normal"]["Id"];
				var videoUrl = content["Video"][index]["Sizes"]["normal"]["Url"];
				var video = $("<iframe />");
				video.attr({"src":thumbnailUrl});
				var captionText = content["Video"][index]["Caption"];
				var SizesOrderArray = content["Video"][index]["SizesOrder"];
				// set class variables
				var labelClass = "BVVideo" + id;
				// set thumbnail
				$container.find(defaultQuestionVideoThumbnailContainer).andSelf().filter(defaultQuestionVideoThumbnailContainer).html(thumbnail);
				// set photo
				$container.find(defaultQuestionVideoIndividualContainer).andSelf().filter(defaultQuestionVideoIndividualContainer).html(video);
				// set caption
				$container.find(defaultQuestionVideoCaptionContainer).andSelf().filter(defaultQuestionVideoCaptionContainer).text(captionText);
				// add CDVs container template
				$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($($container).addClass(labelClass));
			},
			error: function(e) {
				defaultAjaxErrorFunction(e);
			}
		});
	});
}

/* HELPFULNESS */

function loadQuestionFeedback (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionFeedbackContainer,
		"viewContainer":defaultQuestionFeedbackContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// add feedback container template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			loadQuestionFeedbackCount (content, {
				"parentContainer":$container
			});
			loadQuestionFeedbackVoting (content, {
				"parentContainer":$container
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionFeedbackCount (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionFeedbackCountContainer,
		"viewContainer":defaultQuestionFeedbackCountContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set text variables
			var feedbackPositive = content["TotalPositiveFeedbackCount"];
			var feedbackNegative = content["TotalNegativeFeedbackCount"];
			var feedbackTotal = content["TotalFeedbackCount"];
			var feedbackPositivePercentage = (feedbackPositive/feedbackTotal);
			var feedbackNegativePercentage = (feedbackNegative/feedbackTotal);
			var feedbackPositivePercentageFormatted = convertDecimalToPercentage(feedbackPositivePercentage);
			var feedbackNegativePercentageFormatted = convertDecimalToPercentage(feedbackNegativePercentage);
			// set class variables
			var valueClass = "BVFeedback";
			// set positive count value
			$container.find(defaultQuestionFeedbackCountPositiveContainer).andSelf().filter(defaultQuestionFeedbackCountPositiveContainer).text(feedbackPositive);
			// set total count value
			$container.find(defaultQuestionFeedbackCountTotalContainer).andSelf().filter(defaultQuestionFeedbackCountTotalContainer).text(feedbackTotal);
			// set percentage value
			$container.find(defaultQuestionFeedbackCountPercentageContainer).andSelf().filter(defaultQuestionFeedbackCountPercentageContainer).text(feedbackPositivePercentageFormatted);
			// add CDVs container template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionFeedbackVoting (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionFeedbackVotingContainer,
		"viewContainer":defaultQuestionFeedbackVotingContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set text variables
			var feedbackCountPositive = content["TotalPositiveFeedbackCount"];
			var feedbackCountNegative = content["TotalNegativeFeedbackCount"];
			// set class variables
			var valueClass = "BVFeedbackButton";
			// add feedback container
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load positive feedback button
			loadQuestionFeedbackVotingButton("helpful " + feedbackCountPositive, {
				"parentContainer":settings["targetContainer"],
				"targetContainer":defaultQuestionFeedbackVotingButtonPositiveContainer
			});
			// load negative feedback button
			loadQuestionFeedbackVotingButton("unhelpful " + feedbackCountNegative, {
				"parentContainer":settings["targetContainer"],
				"targetContainer":defaultQuestionFeedbackVotingButtonNegativeContainer
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionFeedbackVotingButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionFeedbackVotingButtonContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set attributes and text for button
			$container.find("a").andSelf().filter("a").attr({
				"id":"",
				"title":"",
				"onclick":"",
				"href":"submission.html"
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// set return url cookie
			$.cookie("returnURL", $(location).attr("href"), {
				expires: 7,
				path: "/"
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadQuestionReportInappropriate (content, options) {
	var settings = $.extend(true, {
		"parentContainer":defaultQuestionAnswerParentContainer,
		"targetContainer":defaultQuestionReportInappropriateContainer,
		"viewContainer":defaultQuestionReportInappropriateContainerView,
		"loadOrder":"",
		"productId":""
	}, options);
}

