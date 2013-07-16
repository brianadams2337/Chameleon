
/************************* FEEDBACK *************************/



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
			// load report inappropriate
			loadReportInappropriate (content, {
				"parentContainer":$container,
				"productId":settings["productId"],
				"contentId":settings["contentId"],
				"feedbackSettings":settings["feedbackSettings"]
			});
			// update voting buttons for previous votes
			contentId = settings["contentId"];
			var cookieNameVote = "bvFeedbackVote" + contentId;
			vote = $.cookie(cookieNameVote);
			updateFeedback(cookieNameVote, {
				"contentId":contentId,
				"feedbackSettings":{
					"vote":vote
				}
			});
			var cookieNameReport = "bvReportInappropriate" + contentId;
			updateReportInapproriate(cookieNameReport, {
				"contentId":contentId
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}



/************************* HELPFULNESS VOTING *************************/



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
			"vote":"", // must be defined in call
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

// processes the voting for feedback helpfulness buttons
function processFeedbackVoting (cookieName, options) {
	// content expected is the name of the cookie
	var settings = $.extend(true, {
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"feedbackType":"helpfulness",
			"vote":"",
			"reasonText":""
		}
	}, options);
	// set variables
	contentId = settings["contentId"];
	vote = settings["feedbackSettings"]["vote"];
	// process feedback voting
	if (!$.cookie(cookieName)) {
		// if no cookie for this feedback (no previous feedback vote)
		postFeedbackForm (
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
					"contenttype":settings["feedbackSettings"]["contentType"],
					"feedbacktype":settings["feedbackSettings"]["feedbackType"],
					"productid":settings["productId"],
					"vote":vote
				}
			}
		);
	} else if ($.cookie(cookieName) && $.cookie(cookieName) == vote) {
		// if cookie exists for this feedback and matches vote value, then undo
		postFeedbackForm (
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
					"contenttype":settings["feedbackSettings"]["contentType"],
					"feedbacktype":settings["feedbackSettings"]["feedbackType"],
					"productid":settings["productId"],
					"vote":"UNDO"
				}
			}
		);
	}
}

// updates feedback helpfulness voting buttons to reflect current vote status
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
	// set variables
	contentId = settings["contentId"];
	btnPositive = "#bvIDpositive" + contentId;
	btnNegative = "#bvIDnegative" + contentId;
	vote = settings["feedbackSettings"]["vote"];
	// update button classes to reflect vote
	if (!$.cookie(cookieName)) {
		// enable buttons
		$(btnPositive).removeClass(
			"disabled undo selected"
		);
		$(btnNegative).removeClass(
			"disabled undo selected"
		);
	} else if ($.cookie(cookieName) && $.cookie(cookieName) == vote) {
		// disable and select appropriate buttons
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



/************************* REPORT INAPPROPRIATE *************************/



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
		async: false,
		success: function(container) {
			var $container = $(container);
			// set variables
			var productId = settings["productId"];
			var contentId = settings["contentId"];
			var contentType = settings["feedbackSettings"]["contentType"];
			// add report inappropriate template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load report inappropriate button
			loadReportInappropriateButton("report as inappropriate", {
				"parentContainer":$container,
				"productId":productId,
				"contentId":contentId,
				"feedbackSettings":{
					"contentType":contentType,
				}
			});
			// load report inappropriate form
			loadReportInappropriateForm(null, {
				"parentContainer":$container,
				"productId":productId,
				"contentId":contentId,
				"feedbackSettings":{
					"contentType":contentType,
				}
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadReportInappropriateButton (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":"._BVReportInappropriateButtonContainer",
		"viewContainer":defaultButtonContainerView,
		"loadOrder":"",
		"productId":"",
		"contentId":""
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		async: false,
		success: function(container) {
			var $container = $(container);
			var contentId = settings["contentId"];
			var id = "bvIDReportInappropriate" + contentId;
			// set attributes and text for button
			$container.find(defaultButtonContainer).andSelf().filter(defaultButtonContainer).attr({
				"id":id,
				"title":"",
				"onclick":"return false;",
				"href":""
			}).find(defaultButtonTextContainer).andSelf().filter(defaultButtonTextContainer).text(content);
			// apply form toggle functionality
			$container.find(defaultButtonContainer).andSelf().filter(defaultButtonContainer).click(function() {
				toggleReportInappropriateForm("#bvIDReportInappropriateForm12701255");
			});
			// add button template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

function loadReportInappropriateForm (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"", // must be defined in call
		"targetContainer":"._BVReportInappropriateFormContainer",
		"viewContainer":"views/universal/feedback/submissionFormFeedback.html",
		"loadOrder":"",
		"productId":"",
		"contentId":""
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
			var contentType = settings["feedbackSettings"]["contentType"];
			var id = "bvIDReportInappropriateForm" + contentId;
			var cookieName = "bvReportInappropriate" + contentId;
			// add form template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// set form attributes (just fallbacks, not needed since we are using ajax submission)
			$container.find("form").andSelf().filter("form").attr({
					"id":id,
					"name":id,
					"action":"",
					"method":"POST",
					"enctype":"application/x-www-form-urlencoded",
					"autocomplete":"on",
					"accept-charset":"UTF-8",
					"target":""
				});
			// load header
			loadSectionHeader ("Report Inappropriate", {
				"parentContainer":$container,
				"targetContainer":"._BVSectionHeaderReportInappropriateContainer"
			});
			// load text field
			loadReportInappropriateTextInput (null, {
				"parentContainer":$container,
				"inputSettings":{
					"inputLabel":"What's wrong with it?"
				}
			});
			// load buttons
			loadSubmitButton ("Submit", {
				"parentContainer":$container
			});
			loadCancelButton ("Cancel", {
				"parentContainer":$container
			});
			// add button functionality
			$container.find(defaultButtonSubmitContainer + " " + defaultButtonContainer).andSelf().filter(defaultButtonSubmitContainer + " " + defaultButtonContainer).click(function() {
				processFeedbackReportInappropriate(cookieName, {
					"productId":"",
					"contentId":contentId,
					"feedbackSettings":{
						"contentType":contentType,
						"reasonText":$container.find("._BVReportInappropriateTextInputContainer ._BVFormInput").andSelf().filter("._BVReportInappropriateTextInputContainer ._BVFormInput").val()
					}
				});
			});
			$container.find(defaultButtonCancelContainer + " " + defaultButtonContainer).andSelf().filter(defaultButtonCancelContainer + " " + defaultButtonContainer).click(function() {
				$container.hide();
			});
			$container.hide();
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// review tet
function loadReportInappropriateTextInput (content, options) {
	var settings = $.extend(true, {
		"parentContainer":"",
		"targetContainer":"._BVReportInappropriateTextInputContainer",
		"viewContainer":defaultInputContainerView,
		"loadOrder":"",
		"productId":"",
		"inputSettings":{
			"inputName":"reasonText",
			"inputType":"",
			"inputLabel":"reason text",
			"inputPlaceholder":"", // user defined
			"inputHelperText":"", // user defined
			"inputValue":"",
			"inputMinLength":"",
			"inputMaxLength":"",
			"inputRequired":false,
			"inputDefault":"",
			"inputOptionsArray":""
		}
	}, options);
	$.ajax({
		url: settings["viewContainer"],
		type: 'GET',
		dataType: 'html',
		success: function(container) {
			var $container = $(container);
			// set label
			$container.find(defaultFormLabelTextContainer).andSelf().filter(defaultFormLabelTextContainer).text(settings["inputSettings"]["inputLabel"]).attr({
				"for":settings["inputSettings"]["inputName"]
			});
			// set helper text
			$container.find(defaultFormHelperTextContainer).andSelf().filter(defaultFormHelperTextContainer).text(settings["inputSettings"]["inputHelperText"]);
			// add input template
			$(settings["parentContainer"]).find(settings["targetContainer"]).andSelf().filter(settings["targetContainer"]).html($container);
			// load input
			loadTextAreaInput (null, {
				"parentContainer":$container,
				"inputSettings":settings["inputSettings"]
			});
		},
		error: function(e) {
			defaultAjaxErrorFunction(e);
		}
	});
}

// processes the voting for feedback helpfulness buttons
function processFeedbackReportInappropriate (cookieName, options) {
	// content expected is the name of the cookie
	var settings = $.extend(true, {
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"feedbackType":"inappropriate",
			"reasonText":""
		}
	}, options);
	// set variables
	var contentId = settings["contentId"];
	var contentType = settings["feedbackSettings"]["contentType"];
	var feedbackType = settings["feedbackSettings"]["feedbackType"];
	var reasonText = settings["feedbackSettings"]["reasonText"];
	// process report inappropriate
	if (!$.cookie(cookieName)) {
		console.log(settings);
		console.log(cookieName);
		// if no cookie for this feedback (no previous reports)
		postFeedbackForm (
			contentId,
			function() {
				// set cookie
				$.cookie(cookieName, true);
				// update report button for selected and disabled states
				updateReportInapproriate(cookieName, {
					"contentId":contentId,
					"feedbackSettings":{
						"feedbackType":feedbackType,
						"reasonText":reasonText
					}
				});
			}, {
				// feedback voting API parameters
				"Parameters":{
					"contenttype":contentType,
					"feedbacktype":feedbackType,
					"producttd":settings["productId"],
					"reasontext":reasonText
				}
			}
		);
	} 
	/*
	else if ($.cookie(cookieName) && $.cookie(cookieName) == vote) {
		// if cookie exists for this feedback and matches vote value, then undo
		postFeedbackForm (
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
					"contenttype":settings["feedbackSettings"]["contentType"],
					"feedbacktype":settings["feedbackSettings"]["feedbackType"],
					"productid":settings["productId"],
					"vote":"UNDO"
				}
			}
		);
	}
	*/
}

// updates feedback helpfulness voting buttons to reflect current vote status
function updateReportInapproriate (cookieName, options) {
	var settings = $.extend(true, {
		"productId":"",
		"contentId":"",
		"feedbackSettings":{
			"contentType":"",
			"feedbackType":"",
			"vote":""
		}
	}, options);
	// set variables
	contentId = settings["contentId"];
	btnReport = "#bvIDReportInappropriate" + contentId;
	// update button classes to reflect feedback
	if ($.cookie(cookieName)) {
		// disable report inappropriate buttons
		$(btnReport).addClass("disabled");
	}
}


