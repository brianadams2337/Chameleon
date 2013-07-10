/* HELPFULNESS */

function loadFeedback (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":defaultFeedbackContainer,
		"viewContainer":defaultFeedbackContainerView,
		"loadOrder":"",
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"vote":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// add feedback container template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load feedback count
			loadFeedbackCount (content, {
				"parentContainer":$container
			});
			// load feedback voting
			loadFeedbackVoting (content, {
				"parentContainer":$container,
				"productId":settings["productId"],
				"contentId":settings["contentId"],
				"feedbackSettings":settings["feedbackSettings"]
			});
			// update voting buttons for previous votes
			contentId = settings["contentId"];
			var cookieName = "bvFeedbackVote" + contentId;
			vote = $.cookie(cookieName);
			updateFeedback(cookieName, {
				"contentId":contentId,
				"feedbackSettings":{
					"vote":vote
				}
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadFeedbackCount (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":defaultFeedbackCountContainer,
		"viewContainer":defaultFeedbackCountContainerView,
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
			$container.find(defaultFeedbackCountPositiveContainer).andSelf().filter(defaultFeedbackCountPositiveContainer).text(feedbackPositive);
			// set total count value
			$container.find(defaultFeedbackCountTotalContainer).andSelf().filter(defaultFeedbackCountTotalContainer).text(feedbackTotal);
			// set percentage value
			$container.find(defaultFeedbackCountPercentageContainer).andSelf().filter(defaultFeedbackCountPercentageContainer).text(feedbackPositivePercentageFormatted);
			// add feedback count container template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadFeedbackVoting (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":defaultFeedbackVotingContainer,
		"viewContainer":defaultFeedbackVotingContainerView,
		"loadOrder":"",
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"vote":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set text variables
			var feedbackCountPositive = content["TotalPositiveFeedbackCount"];
			var feedbackCountNegative = content["TotalNegativeFeedbackCount"];
			// set class variables
			var valueClass = "BVFeedbackButton";
			// add feedback voting container
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).append($container);
			// load positive feedback button
			loadFeedbackVotingButton("helpful " + feedbackCountPositive, {
				"parentContainer":$container,
				"targetContainer":defaultFeedbackVotingButtonPositiveContainer,
				"productId":settings["productId"],
				"contentId":settings["contentId"],
				"feedbackSettings":{
					"contentType":settings["feedbackSettings"]["contentType"],
					"vote":"positive"
				}
			});
			// load negative feedback button
			loadFeedbackVotingButton("unhelpful " + feedbackCountNegative, {
				"parentContainer":$container,
				"targetContainer":defaultFeedbackVotingButtonNegativeContainer,
				"productId":settings["productId"],
				"contentId":settings["contentId"],
				"feedbackSettings":{
					"contentType":settings["feedbackSettings"]["contentType"],
					"vote":"negative"
				}
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadFeedbackVotingButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":defaultFeedbackVotingButtonContainer,
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"feedbackType":"helpfulness",
			"userId":"testuser",
			"vote":"", // must be defined in call
			"reasonText":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			// set variables
			var contentId = settings["contentId"];
			var vote = settings["feedbackSettings"]["vote"];

			var id = "bvID" + vote + contentId;
			var cookieName = "bvFeedbackVote" + contentId;
			// set attributes and text for button
			$container.find(defaultButtonContainer).andSelf().filter(defaultButtonContainer).attr({
				"id":id,
				"title":"",
				"onclick":"return false;",
				"href":""
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// apply voting functionality
			$container.find(defaultButtonContainer).andSelf().filter(defaultButtonContainer).click(function() {
				processFeedbackVoting(cookieName, {
					"productId":"",
					"contentId":contentId,
					"feedbackSettings":settings["feedbackSettings"]
				});
			});
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function processFeedbackVoting (cookieName, options) {
	// content expected is cookie
	var settings = $.extend(true, {
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"feedbackType":"helpfulness",
			"userId":"",
			"vote":"",
			"reasonText":""
		}
	}, options);
	contentId = settings["contentId"];
	vote = settings["feedbackSettings"]["vote"];
	if (!$.cookie(cookieName)) {
		// if no cookie for this feedback (no previous feedback vote)
		getFeedbackForm (
			contentId,
			function() {
				// set cookie
				$.cookie(cookieName, vote);
				// update feedback voting for selected and disabled states
				updateFeedback(cookieName, {
					"contentId":contentId,
					"feedbackSettings":{
						"vote":vote
					}
				});
			}, {
				// feedback voting API parameters
				"Parameters":{
					"ContentType":settings["feedbackSettings"]["contentType"],
					"FeedbackType":settings["feedbackSettings"]["feedbackType"],
					"ProductId":settings["productId"],
					"UserId":settings["feedbackSettings"]["userId"],
					"Vote":vote
				}
			}
		);
	} else if ($.cookie(cookieName) && $.cookie(cookieName) == vote) {
		// if cookie exists for this feedback and matches vote value, then undo
		getFeedbackForm (
			contentId,
			function() {
				// set cookie
				$.removeCookie(cookieName);
				// update feedback voting
				updateFeedback(cookieName, {
					"contentId":contentId,
					"feedbackSettings":{
						"vote":vote
					}
				});
			}, {
				// feedback voting API parameters
				"Parameters":{
					"ContentType":settings["feedbackSettings"]["contentType"],
					"FeedbackType":settings["feedbackSettings"]["feedbackType"],
					"ProductId":settings["productId"],
					"UserId":settings["feedbackSettings"]["userId"],
					"Vote":"UNDO"
				}
			}
		);
	}
}

function updateFeedback (cookieName, options) {
	var settings = $.extend(true, {
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"feedbackType":"helpfulness",
			"vote":""
		}
	}, options);
	btnPositive = "#bvIDpositive" + contentId;
	btnNegative = "#bvIDnegative" + contentId;
	contentId = settings["contentId"];
	vote = settings["feedbackSettings"]["vote"];
	if (!$.cookie(cookieName)) {
		$(btnPositive).removeClass(
			"disabled undo selected"
		);
		$(btnNegative).removeClass(
			"disabled undo selected"
		);
	} else if ($.cookie(cookieName) && $.cookie(cookieName) == vote) {
		if (vote == "positive") {
			$(btnPositive).addClass(
				"selected"
			).removeClass(
				"disabled undo"
			);
			$(btnNegative).addClass(
				"disabled undo"
			).removeClass(
				"selected"
			);
		} else if (vote == "negative") {
			$(btnNegative).addClass(
				"selected"
			).removeClass(
				"disabled undo"
			);
			$(btnPositive).addClass(
				"disabled undo"
			).removeClass(
				"selected"
			);
		}
	}
}

function loadReportInappropriate (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":defaultReportInappropriateContainer,
		"viewContainer":defaultReportInappropriateContainerView,
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
			$container.find(defaultButtonContainer).andSelf().filter(defaultButtonContainer).attr({
				"id":"",
				"title":"",
				"onclick":"return false;",
				"href":""
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}
